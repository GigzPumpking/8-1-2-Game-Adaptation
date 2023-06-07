class Scene2 extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('background', 'Background.png');
        this.load.image('idle', 'idle.png');
        this.load.atlas('walkingManAtlas', 'walkingMan.png', 'walkingMan.json');
        this.load.image('closeBG','close_bg_scene2.png');
        this.load.image('farBG','far_bg_scene2.png');
    }

    create() {
        this.farBG = this.add.tileSprite(750, 300, 1500, 600, 'farBG');
        this.closeBG = this.add.tileSprite(750, 300, 1500, 600, 'closeBG');

        currScene = 'playScene2';
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.chasers = [];
        this.chaserSpawnTimer = 0;
        this.chaserSpawnRate = 500;

        //this.add.tileSprite(0, 0, 768, 768, 'background').setOrigin(0, 0);

        this.groundOffset = 110;

        this.player = new s2Player(this, game.config.width - 50, game.config.height - 50 + this.groundOffset, 'idle', 0).setImmovable(true);
        this.player.anims.create({
            key: 'PlayerWalk',
            frames: this.anims.generateFrameNames('walkingManAtlas', {
                prefix: 'walkingMan',
                start: 1,
                end: 8,
            }),
            defaultTextureKey: 'walkingManAtlas',
            frameRate: 7,
            repeat: -1
        });
        this.player.anims.play('PlayerWalk', true);

        this.anims.create({
            key: 'Walk',
            frames: this.anims.generateFrameNames('walkingManAtlas', {
                prefix: 'walkingMan',
                start: 1,
                end: 8,
            }),
            defaultTextureKey: 'walkingManAtlas',
            frameRate: 7,
            repeat: -1
        });
    }

    update() {
        this.closeBG.tilePositionX += (5);
        this.farBG.tilePositionX += (5);
        //When P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) this.scene.pause().launch('pauseScene');
        //Spawn chasers until there are 5

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
            chaser.incrementChasers(this.chasers.length);
            if (this.physics.collide(chaser, this.player)) {
                this.scene.start('gameOverScene');
            }
        });
    }

    spawnChaser() {
        //spawn a chaser at a random location
        let chaser = new s2Chaser(this, -50, game.config.height + this.groundOffset, 'idle', 0);
        //set chaser speed to random value between 10 and 50
        chaser.moveSpeed = Math.floor(Math.random() * 40) + 10;
        
        this.physics.add.collider(chaser, this.player);
        chaser.on('drag', function (pointer, dragX, dragY) {
            chaser.setPosition(dragX, dragY);
        }, this)

        chaser.anims.play('Walk', true);
        chaser.anims.frameRate = chaser.moveSpeed/3;

        this.chasers.push(chaser);
    }

    // Unused Function

    /*snapIfOverlap(toDrag) {
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
    }*/

}