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
        this.load.audio('footsteps', 'kronbits/scene2/Retro FootStep Mud 01.wav');
        this.load.audio('voice1', 'dillonbecker/scene2/voice1.wav');
        this.load.audio('voice2', 'dillonbecker/scene2/voice2.wav');
        this.load.audio('voice3', 'dillonbecker/scene2/voice3.wav');
        this.load.audio('voice4', 'dillonbecker/scene2/voice4.wav');
        this.load.audio('voice5', 'dillonbecker/scene2/voice5.wav');
        this.load.audio('voice6', 'dillonbecker/scene2/voice6.wav');
        this.load.audio('voice7', 'dillonbecker/scene2/voice7.wav');
        this.load.image("dragaway", "dragaway.png");
    }

    create() {
        this.voice1 = this.sound.add('voice1', { mute: false, volume: 0.205, rate: 1});
        this.voice2 = this.sound.add('voice2', { mute: false, volume: 0.205, rate: 1});
        this.voice3 = this.sound.add('voice3', { mute: false, volume: 0.205, rate: 1});
        this.voice4 = this.sound.add('voice4', { mute: false, volume: 0.205, rate: 1});
        this.voice5 = this.sound.add('voice5', { mute: false, volume: 0.205, rate: 1});
        this.voice6 = this.sound.add('voice6', { mute: false, volume: 0.205, rate: 1});
        this.voice7 = this.sound.add('voice7', { mute: false, volume: 0.205, rate: 1});
        this.voices = [this.voice1, this.voice2, this.voice3, this.voice4, this.voice5, this.voice6, this.voice7];

        this.playerWalkSFX = this.sound.add('footsteps', { 
            mute: false,
            volume: 0.205,
            rate: 2.3,
            loop: true 
        });
        this.playerWalkSFX.play();

        this.farBG = this.add.tileSprite(750, 300, 1500, 600, 'farBG');
        this.closeBG = this.add.tileSprite(750, 300, 1500, 600, 'closeBG');

        this.dragaway = this.add.image(300, 300, 'dragaway').setScale(2);
        this.dragaway.depth = 1;

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
        //scroll background, parallax effect
        this.closeBG.tilePositionX += (2);
        this.farBG.tilePositionX += (1.8);

        //When P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) this.scene.pause().launch('pauseScene');
        //Spawn chasers until there are 5

        //periodically spawn chasers while there are less than 10
        if (this.chasers.length < 10) {
            if (this.chaserSpawnTimer < 0) {
                this.spawnChaser();
                this.chaserSpawnTimer = this.chaserSpawnRate;
            }
            else this.chaserSpawnTimer--;
        }

        //collision checks for chasers
        this.chasers.forEach(chaser => {
            chaser.update();
            chaser.incrementChasers(this.chasers.length);
            // if chaser is touching player, end game

            if (chaser.x >= this.player.x - this.player.width*this.player.scale + 30 && chaser.y >= this.player.y - this.player.height*this.player.scale - 20) {
                this.scene.start('gameOverScene');
            }

        });

        //eventually the player escapes to scene 3!
        this.time.delayedCall(50000, () => {
            this.scene.start('playScene3');
        });
    }

    spawnChaser() {
        //spawn a chaser at a random location
        let chaser = new s2Chaser(this, -50, game.config.height + this.groundOffset, 'idle', 0);
        //set chaser speed to random value between 10 and 50
        chaser.moveSpeed = Math.floor(Math.random() * 40) + 10;

        //randomize Chaser scale 
        chaser.scale = Math.random() * 0.5 + 2.7;
        console.log(chaser.scale);
        
        chaser.on('drag', function (pointer, dragX, dragY) {
            chaser.setPosition(dragX, dragY);
        }, this)

        chaser.anims.play('Walk', true);
        chaser.anims.frameRate = chaser.moveSpeed/3;

        this.chasers.push(chaser);

        /*// Add a collider between each chaser

        this.chasers.forEach(chaser => {
            for (let i = 0; i < this.chasers.length; i++) {
                this.physics.add.collider(chaser, this.chasers[i]);
            }
        });*/
    }

}