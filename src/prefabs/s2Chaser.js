class s2Chaser extends Phaser.Physics.Arcade.Sprite {
    //enemies that chase the player in scene 2
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
        this.playerWalkSFX = this.scene.sound.add('footsteps', { 
            mute: false,
            volume: 0.205,
            rate: 2.3,
            loop: true 
        });

        this.popUpConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            color: '#000',
            align: 'center'
        }

        //random timer for chaser to say something
        this.randomTimer = Math.floor(Math.random() * 300) + 200;

        this.numChasers = 0;
    }

    randomizedPhrase() {
        //Phrases is a list of phrases that the chaser can say, and the chaser will randomly choose one to say

        let phrases = ["Come back, Guido!", "About the script for Claudia...", "Please consider my idea!", "How was my screen test?", "What role do I play?", "I have three questions.", "Does Claudia have a script?", "Do you have a script?", "You're going to lose her.", "Signora Carla called.", "I would like to introduce you...", "Are your ideas any clearer?", "What are your love stories?"];
        let randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    }

    randomizedIntro() {
        //Phrases is a list of intro phrases that the chaser can say, and the chaser will randomly choose one to say

        let phrases = ["Guido.", "Director!", "Dottore!", "Guido, darling!", "Guido, dear!", "Excuse me...", "Excuse me, director?", "Buon Giorno.", "Buon Giorno!"];
        let randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    }

    talk() {
        let IntroText = this.scene.add.text(this.x + this.width*this.scale - 5, this.y - this.height*this.scale + 50, this.randomizedIntro(), this.popUpConfig).setOrigin(0, 0.5).setDepth(3);
        //play talking sound effect
        let randomVoiceIndex = Math.floor(Math.random() * this.scene.voices.length);
        this.scene.voices[randomVoiceIndex].play();
        
        //randomize text size
        IntroText.setFontSize(Math.floor(Math.random() * 16) + 8);
        
        this.scene.tweens.add({
            targets: IntroText,
            alpha: 0,
            duration: 2000,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
            onComplete: () => {
                IntroText.destroy();
                this.talk2();
            }
        });
    }

    talk2() {
        let Text = this.scene.add.text(this.x + this.width*this.scale - 10, this.y - this.height*this.scale + 50, this.randomizedPhrase(), this.popUpConfig).setOrigin(0, 0.5).setDepth(3);
        //play talking sound effect
        let randomVoiceIndex = Math.floor(Math.random() * this.scene.voices.length);
        this.scene.voices[randomVoiceIndex].play();
        //randomize text size
        Text.setFontSize(Math.floor(Math.random() * 16) + 8);
        Text.fontSize *= (1 - this.numChasers/50);
        this.scene.tweens.add({
            targets: Text,
            alpha: 0,
            duration: 2000,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
            onComplete: () => {
                Text.destroy();
            }
        });
    }

    move() {
        //Automatically moves in facing direction
        let angle = this.body.rotation;
        this.forceX = Math.cos(angle) * this.moveSpeed;
        this.body.setVelocityX(this.forceX);
    }

    incrementChasers(num) {
        this.numChasers = num;
    }

    update() {
        // If chaser is not playing footsteps sound, play it, otherwise do nothing
        console.log(pause + " " + scene2End);
        if (!this.playerWalkSFX.isPlaying && !pause && !scene2End) {
            this.playerWalkSFX.play();
        } else if (pause) {
            this.playerWalkSFX.stop();
        }

        if (this.y > game.config.height - this.height*3) this.move();
        else this.body.setVelocityX(0);

        //console.log(this.randomTimer);

        if (this.randomTimer < 0) {
            this.talk();
            this.randomTimer = Math.floor(Math.random() * 300) + 500;
        } else this.randomTimer -= 1;
    }
}