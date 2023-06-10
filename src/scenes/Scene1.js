class Scene1 extends Phaser.Scene {
    constructor() {
        super("playScene1");
    }

    preload() {
        this.load.path = './assets/';
        this.load.atlas('walkingManAtlas', 'walkingMan.png', 'walkingMan.json');
        this.load.audio('footsteps', 'kronbits/scene2/Retro FootStep Mud 01.wav');
        this.load.image('walkingManIdle','walkingManIdle.png');
        this.load.image('ground','ground.png');
        this.load.image('car','car.png');
        this.load.image('walkright', 'walkright.png');
        this.load.audio('wind', 'kronbits/scene1/Retro Cinematic Wind 02.wav')
    }

    create() {

        currScene = 'playScene1';
        this.playerWalkSFX = this.sound.add('footsteps', { 
            mute: false,
            volume: 0.205,
            rate: 2.3,
        });

        this.windSFX = this.sound.add('wind', { 
            mute: false,
            volume: 0.205,
            rate: 1,
            loop: true 
        });
        //this.windSFX.play();

        this.keys = this.input.keyboard.addKeys("W,A,S,D");

        this.moveright = this.add.image(300, 300, 'walkright').setScale(2);

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

        //collidables, including cars, the ground and eventually other obstacles
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 600, 'ground');
        this.platforms.create(400, 575, 'car').setScale(2).refreshBody();

        this.physics.add.collider(this.player, this.platforms);
    }

    update() {
        this.player.update();
        if (this.player.x > 500) {
            this.scene.start('playScene2');
        }
    }
}
