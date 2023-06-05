class s2Chaser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this
            .setScale(3)
            .setGravityY(200)
            .setInteractive({ draggable: true })
            .setCollideWorldBounds(true);

        this.moveSpeed = 100;

    }

    move() {
        //Automatically moves in facing direction
        let angle = this.body.rotation;
        this.forceX = Math.cos(angle) * this.moveSpeed;
        this.body.setVelocityX(this.forceX);
    }

    update() {
        this.move();
    }
}