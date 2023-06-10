//ART CREDITS
//art assets were drawn by Luca Stubbe for this project
//SFX CREDITS:
//asset pack https://dillonbecker.itch.io/sdap
//    - voice effects for characters speaking in scenes 2 & 3
//asset pack https://kronbits.itch.io/freesfx
//    - sfx for character footsteps in scenes 1, 2 & 3, wind sfx in scene 1, music in scene 2



//game config
let config = {
    type: Phaser.AUTO,
    height: 600,
    width: 1000,
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

let clockConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
        right: 5,
        left: 5
    },
    fixedWidth: 170
}