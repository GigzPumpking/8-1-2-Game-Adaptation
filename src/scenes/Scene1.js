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
        this.load.image('car2','car2.png');
        this.load.image('tutorial', 'tutorial_scene1.png');
        this.load.image('close_bg_scene1', 'close_bg_scene1.png');
        this.load.image('far_bg_scene1', 'far_bg_scene1.png');
        this.load.image('farthest_bg_scene1', 'farthest_bg_scene1.png');
        this.load.audio('wind', 'kronbits/scene1/Retro Cinematic Wind 02.wav')
    }

    create() {

        scene1End = false;

        currScene = 'playScene1';

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

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
        this.windSFX.play();

        this.keys = this.input.keyboard.addKeys("W,A,S,D");

        this.add.image(550, 400, 'farthest_bg_scene1');
        this.add.image(550, 525, 'close_bg_scene1');
        this.add.image(1500, 320, 'far_bg_scene1').setScale(2);

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
        this.platforms.create(100, 560, 'car');
        this.platforms.create(375, 560, 'car2');
        this.platforms.create(650, 560, 'car');
        this.platforms.create(925, 560, 'car');
        

        this.physics.add.collider(this.player, this.platforms);

        this.add.text(370, 0, 'Escape traffic! Use WASD to move.', {
            fontSize: 32,
            backgroundColor: '#000000',
            fixedWidth: 650,
        }).setDepth(3);
    }

    update() {
        this.player.update();

        //When P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            pause = true;
            this.scene.pause().launch('pauseScene');
        }

        if (this.player.x > 500) {
            scene1End = true;
            this.windSFX.stop();
            this.scene.start('playScene2');
        }
        
    }
}
