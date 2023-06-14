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
        this.load.image('tutorial_scene3', 'tutorial_scene3.png');
        this.load.image('lampSmall', 'lampSmall.png');
        this.load.image('lampLarge', 'lampLarge.png');
        this.load.image('spotlight', 'spotlight.png');
        this.load.image('s3actor_1', 's3actor_1.png');
        this.load.image('s3actor_2', 's3actor_2.png');
        this.load.image('s3actor_3', 's3actor_3.png');
        this.load.image('s3actor_4', 's3actor_4.png');
        this.load.image('s3actor_5', 's3actor_5.png');
        this.load.image('s3actor_6', 's3actor_6.png');
        this.load.audio('chime1', 'kronbits/scene3/chime1.wav');
        this.load.audio('chime2', 'kronbits/scene3/chime2.wav');
        this.load.audio('chime3', 'kronbits/scene3/chime3.wav');
        this.load.audio('chime4', 'kronbits/scene3/chime4.wav');
        this.load.audio('chime5', 'kronbits/scene3/chime5.wav');
        this.load.audio('chime6', 'kronbits/scene3/chime6.wav');
        this.load.audio('silentfilm', 'silentfilmmusic.mp3');
        this.load.image('redX', 'redX.png');
        this.load.image('endScreen', 'endScreen.png');
        this.load.image('credits', 'credits.png');
    }

    create() {
        
        //loop silentfilm music song
        this.silentfilm = this.sound.add('silentfilm', {
            mute: false,
            volume: 0.1,
            rate: 1,
            loop: true
        });
        this.silentfilm.play();

        currScene = 'playScene3';
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        
        this.playerWalkSFX = this.sound.add('footsteps', { 
            mute: false,
            volume: 0.205,
            rate: 2.3,
        });

        this.actors = [];

        this.chimeIndex = 1;

        this.keys = this.input.keyboard.addKeys("W,A,S,D");

        for (let i = 0; i < 1050 / 50; i ++) {
            this.add.image(i * 50, 590, 'lampSmall').setScale(0.5);
        }

        for (let i = 0; i < 1050 / 190; i ++) {
            this.add.image((i * 190) + 10, 565, 'lampLarge').setScale(0.5);
        }

        this.add.image(500, 300, 'spotlight');

        this.add.image(500, 480, 'close_bg').setScale(2);
        

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
        this.platforms.create(200, 600, 'ground').setScale(2);
        this.platforms.create(700, 600, 'ground').setScale(2);

        this.physics.add.collider(this.player, this.platforms);

        this.add.text(55, 0, 'Drag the crew into positions to start filming!', {
            fontSize: 32,
            fixedWidth: 900,
            backgroundColor: '#2c2c2c',
            //center
            align: 'center',
        }).setDepth(3);

        this.actorSpriteIndex = 1;

        for (let i = 0; i < 6; i++) {
            this.spawnActor();
        }

        this.redXs = [
            this.add.image(100, 550, 'redX'),
            this.add.image(900, 550, 'redX'),
            this.add.image(180, 340, 'redX'),
            this.add.image(820, 340, 'redX'),
            this.add.image(420, 520, 'redX'),
            this.add.image(650, 520, 'redX'),
        ]
        this.zoneCoords = [
            [100, 550, 20, 20],
            [900, 550, 20, 20],
            [180, 340, 20, 20],
            [820, 340, 20, 20],
            [420, 520, 20, 20],
            [650, 520, 20, 20],
        ];
        this.occupied = [false, false, false, false, false, false];
    }

    update() {
        this.player.update();

        //When P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            pause = true;
            this.scene.pause().launch('pauseScene');
        }
    }
    

    spawnActor() {
        //spawn actor randomly in scene
        let actor = new s3Actor(this, Math.floor(Math.random() * 1000), 450, 's3actor_' + this.actorSpriteIndex, 0);
        actor.on('drag', function (pointer, dragX, dragY) {
            actor.setPosition(dragX, dragY);
            this.snapIfOverlap(actor);
        }, this);
        if (this.actorSpriteIndex == 6) {
            this.actorSpriteIndex = 1;
        } else {
            this.actorSpriteIndex++;
        }

        this.actors.push(actor);
    }

    snapIfOverlap(toDrag) {
        //check if the given coords overlap with a snappable zone, then snap if that's the case
        //zone coords for all snappable zones, in the format: x, y, width / 2, height / 2
        let margin = 5;
        //margin of error for snap
        for (let i = 0; i < this.zoneCoords.length; i++) {
            if (toDrag.x > this.zoneCoords[i][0] - this.zoneCoords[i][2] - margin && toDrag.x < this.zoneCoords[i][0] + this.zoneCoords[i][2] + margin && toDrag.y < this.zoneCoords[i][1] + this.zoneCoords[i][3] + margin && toDrag.y > this.zoneCoords[i][1] - this.zoneCoords[i][3] - margin) {
                console.log(toDrag.y);
                console.log(this.zoneCoords[i][2] + this.zoneCoords[i][3] + margin);
                console.log(this.zoneCoords[i][2] - this.zoneCoords[i][3] - margin);
                console.log("snap!");
                //within the bounds of snappable zone, should snap
                this.sound.play('chime' + this.chimeIndex, {loop: false, volume: 0.5});
                if (this.chimeIndex == 6) {
                    if (this.chimeIndex == 6) {
                        this.time.delayedCall((500), () => {
                            this.add.image(500, 275, 'endScreen');
                            this.add.image(200, 200, 'credits');
                            let Restart = new Button(200, 350, 'Restart', this, () => {
  
                                //stop music
                                this.silentfilm.stop();
                                this.scene.start('playScene1');
                            })
                        });
                    }
                } else {
                    this.chimeIndex++;
                }
                let tempDrag = this.add.image(toDrag.x, toDrag.y, toDrag.texture);
                toDrag.destroy();
                toDrag = tempDrag;
                toDrag.setScale(3);
                toDrag.setPosition(this.zoneCoords[i][0], this.zoneCoords[i][1]);
                //replace the s3Actor with an image to prevent movement and dragging

                if (toDrag.x > 500) {
                    toDrag.flipX = true;
                }

                this.zoneCoords.splice(i, 1);
                this.redXs[i].destroy();
                this.redXs.splice(i, 1);
                //remove snap zone from list of snappable zones
                //remove red X sprite

                //check if game is over
                return true;
            }
        }
        return false;
    }
}
