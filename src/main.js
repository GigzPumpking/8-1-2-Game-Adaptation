let config = {
    type: Phaser.AUTO,
    height: 768,
    width: 768,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Scene1, Scene2, Scene3, GameOver, Pause ]
}

let game = new Phaser.Game(config);

// set UI

let centerX = game.config.width/2;
let centerY = game.config.height/2;

let borderUISize = game.config.height / 35;
let borderPadding = borderUISize / 10;

let PlayButton, Ready;

let fallSpeed = 3;

let keyP;

let currScene;