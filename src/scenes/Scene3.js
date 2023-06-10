class Scene3 extends Phaser.Scene {
    constructor() {
        super("playScene3");
    }

    preload() {
        this.load.path = './assets/';
        this.load.atlas('walkingManAtlas', 'walkingMan.png', 'walkingMan.json');
        this.load.audio('footsteps', 'kronbits/scene2/Retro FootStep Mud 01.wav');
        this.load.image('walkingManIdle','walkingManIdle.png');
        this.load.image('ground','ground.png');
        this.load.image('close_bg','close_bg_scene3.png');
        this.load.image('draghere', 'draghere.png')
    }

    create() {

        currScene = 'playScene1';
        this.playerWalkSFX = this.sound.add('footsteps', { 
            mute: false,
            volume: 0.205,
            rate: 2.3,
        });

        this.keys = this.input.keyboard.addKeys("W,A,S,D");

        this.add.image(400, 450, 'close_bg').setScale(2);
        this.add.image(400, 400, 'draghere').setScale(2);

        this.player = new s1Player(this, 200, 200, 'walkingManIdle', 0);
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

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 600, 'ground');

        this.physics.add.collider(this.player, this.platforms);

        this.spawnActor();
    }

    update() {
        this.player.update();
    }

    spawnActor() {
        let actor = new s3Actor(this, Math.floor(Math.random() * 500), 450, 'walkingManIdle', 0);
        actor.on('drag', function (pointer, dragX, dragY) {
            actor.setPosition(dragX, dragY);
            this.snapIfOverlap(actor);
        }, this);
    }

    snapIfOverlap(toDrag) {
        //check if the given coords overlap with a snappable zone, then snap if that's the case
        let zoneCoords = [[400, 400, 200, 200]];
        //zone coords for all snappable zones, in the format: x, y, width / 2, height / 2
        let margin = 10;
        //margin of error for snap
        for (let i = 0; i < zoneCoords.length; i++) {
            if (toDrag.x > zoneCoords[i][0] - zoneCoords[i][2] - margin && toDrag.x < zoneCoords[i][0] + zoneCoords[i][2] + margin
                && toDrag.y < zoneCoords[i][2] + zoneCoords[i][3] + margin && toDrag.y > zoneCoords[i][2] - zoneCoords[i][3] - margin) {
                //within the bounds of snappable zone, should snap
                console.log("snap!");
                toDrag.setPosition(zoneCoords[i][0], zoneCoords[i][1]);
                toDrag.body.setAllowGravity(false);
                toDrag.setImmovable(true);
                toDrag.body.velocity.x = 0;
                toDrag.body.velocity.y = 0;
                return true;
            }
        }
        return false;
    }
}
