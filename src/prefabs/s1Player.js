class s1Player extends Phaser.Physics.Arcade.Sprite {
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
    }

    update() {
        if (this.scene.keys["A"].isDown) {
            this.setVelocityX(-160);
            this.flipX = true;
            if (this.anims.isPlaying) {
                this.anims.play('PlayerWalk');
            }
        } else if (this.scene.keys["D"].isDown) {
            this.setVelocityX(160);
            this.flipX = false;
            if (this.anims.isPlaying) {
                this.anims.play('PlayerWalk');
            }
        } else {
            this.setVelocityX(0);
            this.anims.stop();
        }

        if (this.scene.keys["W"].isDown && this.body.touching.down)
        {
            this.setVelocityY(-330);
            this.anims.stop();
        }
    }
}