class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('ground', 'ground.png');
        this.load.image('car', 'car.png');
        this.load.image('car2', 'car2.png');
        this.load.image('man', 'walkingManIdle.png');
        this.load.atlas('walkingManAtlas', 'walkingMan.png', 'walkingMan.json');
        this.load.image('walkingMan', 'walkingMan.png');
    }
    create() {
        currScene = 'menuScene';
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '75px',
            backgroundColor: '#808588',
            color: '#222021',
            align: 'right',
            padding: {
                top: 15,
                bottom: 15,
                right: 15,
                left: 15
            },
            fixedWidth: 0
        }


        // Add grey rectangle to the background
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x2c2c2c).setOrigin(0, 0);
        // Add car sprite to the left and right of the screen
        this.car = this.add.sprite(20, game.config.height/2 + 170, 'car').setOrigin(0, 0);
        this.car2 = this.add.sprite(game.config.width - 20, game.config.height/2 + 170, 'car2').setOrigin(1, 0).flipX = true;
        // Add walk sprites to the center of the screen
        this.walk = this.add.sprite(game.config.width/2, game.config.height/2 + 50, 'man').setOrigin(0.5, 0).setScale(3);
        this.walk.anims.create({
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
        this.walk.anims.play('PlayerWalk', true);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 220, '8 1/2 Adaptation', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '48px';
        menuConfig.color = '#222021';
        menuConfig.backgroundColor = '#FFFFFF';
        const playButton = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 60, 'PLAY', menuConfig).setOrigin(0.5).setInteractive();
        menuConfig.fontSize = '28px';
        menuConfig.fontFamily = 'Arial';

        Ready = false;
        playButton.on('pointerdown', function (pointer)
        {
          Ready = true;
        });

        // define keys
    }
    update() {
        if (Ready == true) {
            this.scene.start('playScene1');
        }
      }
}