class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create() {
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            backgroundColor: '#F0000C',
            color: '#000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let mainText = this.add.text(centerX, centerY - 200, ' Game Over ', textConfig).setOrigin(0.5);
    }

    update() {
        let Restart = new Button(centerX, centerY - 100, 'Restart', this, () => {
            this.scene.resume(currScene).stop();
            var sceneRestart = this.scene.get(currScene);

            sceneRestart.scene.restart();
        })
    }
}