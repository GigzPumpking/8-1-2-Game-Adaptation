class s3Actor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this
            .setScale(3)
            .setGravityY(300)
            .setInteractive({ draggable: true })
            .setCollideWorldBounds(true);

        this.moveSpeed = 20;
        this.playerWalkSFX = scene.sound.add('footsteps', { 
            mute: false,
            volume: 0.205,
            rate: 2.3,
            loop: true 
        });
        //this.playerWalkSFX.play();
    }
}