class Scene2 extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    preload() {
        this.load.image('dragme', 'assets/dragme.png');
        this.load.image('redX', 'assets/redX.png');
    }

    create() {
        let redX = this.add.sprite(10, 10, 'redX');
        let dragme = this.add.sprite(50, 50, 'dragme');
        dragme.setInteractive({ draggable: true });
        dragme.on('drag', function (pointer, dragX, dragY) {
            dragme.setPosition(dragX, dragY);
        }, this)
        dragme.on('dragend', function (pointer, dragX, dragY) {
            if (this.snapIfOverlap(dragme, dragX, dragY)) {
                console.log("overlaps with snap");
            }
        }, this)
    }

    update() {

    }

    snapIfOverlap(toDrag) {
        //check if the given coords overlap with a snappable zone, then snap if that's the case
        let zoneCoords = [[10, 10, 10, 10]];
        //zone coords for all snappable zones, in the format: x, y, width / 2, height / 2
        let margin = 10;
        //margin of error for snap
        for (let i = 0; i < zoneCoords.length; i++) {
            if (toDrag.x > zoneCoords[i][0] - zoneCoords[i][2] - margin && toDrag.x < zoneCoords[i][0] + zoneCoords[i][2] + margin
                && toDrag.y < zoneCoords[i][2] + zoneCoords[i][3] + margin && toDrag.y > zoneCoords[i][2] - zoneCoords[i][3] - margin) {
                //within the bounds of snappable zone, should snap
                toDrag.setPosition(zoneCoords[i][0], zoneCoords[i][1]);
                return true;
            }
            
        }
        return false;
    }

}