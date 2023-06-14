// Adapted Movie Title: 8 1/2
// Random Movie Selection: +5 points EC

//ART CREDITS
//art assets were drawn by Luca Stubbe for this project
//SFX CREDITS:
//asset pack https://dillonbecker.itch.io/sdap
//    - voice effects for characters speaking in scenes 2 & 3
//asset pack https://kronbits.itch.io/freesfx
//    - sfx for character footsteps in scenes 1, 2 & 3, wind sfx in scene 1, music in scene 2

//PHASER COMPONENTS USED
// - Camera (Follows the player across the scene in Scene 1)
// - Physics (Used for collision detection and gravity for the player and other NPC characters in all three scenes)
// - Timer (Used to create a timer for the player to complete Scene 2)
// - Text Objects (Used to display dialogue for the chasing NPCs in Scene 2, along with tutorial text in all three scenes)
// - TileSprite (Used in Scene 2's parallax moving background)
// - Tween manager (Used for wind sfx fade in in Scene 1 and chaser dialogue in Scene 2)
// - Animation (Used to create walking animations in all three scenes)

// Programming Credits:
// - Luca Stubbe
// - Hung Nguyen

//game config
let config = {
    type: Phaser.AUTO,
    height: 600,
    width: 1000,
    scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.RESIZE
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
let pause = false;

let scene1End = false;
let scene2End = false;
let scene3End = false;

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