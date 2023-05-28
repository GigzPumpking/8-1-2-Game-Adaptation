class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

    }
    create() {
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '75px',
            backgroundColor: '#ADD8E6',
            color: '#00008B',
            align: 'right',
            padding: {
                top: 15,
                bottom: 15,
                right: 15,
                left: 15
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 220, '8 1/2 Adaptation', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '48px';
        menuConfig.color = '#FF0000';
        menuConfig.backgroundColor = '#FA8072';
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