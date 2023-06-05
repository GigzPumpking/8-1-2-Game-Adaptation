class Scene2 extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('dragme', 'dragme.png');
        this.load.image('redX', 'redX.png');
        this.load.image('background', 'Background.png');
        this.load.image('idle', 'idle.png');
        this.load.atlas('manAtlas', 'walk.png', 'walk.json');
    }

    create() {
        this.chasers = [];
        this.chaserSpawnTimer = 0;
        this.chaserSpawnRate = 500;

        this.chaserSpeedIncreaseTimer = 0;
        this.chaserSpeedIncreaseRate = 500;
        this.chaserSpeed = 20;

        this.add.tileSprite(0, 0, 768, 768, 'background').setOrigin(0, 0);
        let redX = this.add.sprite(10, 10, 'redX');
        let dragme = this.add.sprite(50, 50, 'dragme');
        dragme.setInteractive({ draggable: true });
        dragme.on('drag', function (pointer, dragX, dragY) {
            dragme.setPosition(dragX, dragY);
        }, this)
        dragme.on('dragend', function (pointer, dragX, dragY) {
            if (this.snapIfOverlap(dragme, dragX, dragY)) {
                console.log("overlaps with snap");
            }
        }, this)

        this.ground = this.physics.add.sprite(game.config.width/2, game.config.height, 'ground').setImmovable(true);

        this.player = new s2Player(this, game.config.width - 50, game.config.height - 50, 'idle', 0).setImmovable(true);
        this.anims.create({
            key: 'PlayerWalk',
            frames: this.anims.generateFrameNames('manAtlas', {
                prefix: 'Walk',
                start: 1,
                end: 4,
            }),
            defaultTextureKey: 'manAtlas',
            frameRate: 7,
            repeat: -1
        });
        this.player.anims.play('PlayerWalk', true);
    }

    update() {
        //Spawn chasers until there are 5
        if (this.chaserSpeedIncreaseTimer < 0) {
            this.chaserSpeedIncreaseTimer = this.chaserSpeedIncreaseRate;
            this.chaserSpeed += 5;
        }
        else this.chaserSpeedIncreaseTimer--;

        if (this.chasers.length < 10) {
            if (this.chaserSpawnTimer < 0) {
                this.spawnChaser();
                this.chaserSpawnTimer = this.chaserSpawnRate;
            }
            else this.chaserSpawnTimer--;
        }

        this.chasers.forEach(chaser => {
            chaser.update();
            //if chaser collides with player, end game
            if (this.physics.collide(chaser, this.player)) {
                this.scene.start('gameOverScene');
            }
        });
    }

    spawnChaser() {
        //spawn a chaser at a random location
        let chaser = new s2Chaser(this, -50, game.config.height, 'idle', 0);
        chaser.moveSpeed = this.chaserSpeed;
    
        this.physics.add.collider(chaser, this.ground);
        this.physics.add.collider(chaser, this.player);
        chaser.on('drag', function (pointer, dragX, dragY) {
            chaser.setPosition(dragX, dragY);
        }, this)

        this.anims.create({
            key: 'Walk',
            frames: this.anims.generateFrameNames('manAtlas', {
                prefix: 'Walk',
                start: 1,
                end: 4,
            }),
            defaultTextureKey: 'manAtlas',
            frameRate: this.chaserSpeed/3,
            repeat: -1
        });

        chaser.anims.play('Walk', true);
        this.chasers.push(chaser);
    }

    snapIfOverlap(toDrag) {
        //check if the given coords overlap with a snappable zone, then snap if that's the case
        let zoneCoords = [[10, 10, 10, 10]];
        //zone coords for all snappable zones, in the format: x, y, width / 2, height / 2
        let margin = 10;
        //margin of error for snap
        for (let i = 0; i < zoneCoords.length; i++) {
            if (toDrag.x > zoneCoords[i][0] - zoneCoords[i][2] - margin && toDrag.x < zoneCoords[i][0] + zoneCoords[i][2] + margin
                && toDrag.y < zoneCoords[i][2] + zoneCoords[i][3] + margin && toDrag.y > zoneCoords[i][2] - zoneCoords[i][3] - margin) {
                //within the bounds of snappable zone, should snap
                toDrag.setPosition(zoneCoords[i][0], zoneCoords[i][1]);
                return true;
            }
            
        }
        return false;
    }

}