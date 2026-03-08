export class ScreenConstraints {
    constructor(aspectWidth = 16, aspectHeight = 9) {
        this.aspectWidth = aspectWidth;
        this.aspectHeight = aspectHeight;

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.update();
    }

    update() {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const targetRatio = this.aspectWidth / this.aspectHeight;
        const screenRatio = screenW / screenH;

        if (screenRatio > targetRatio) {
            this.height = screenH;
            this.width = screenH * targetRatio;
        } else {
            this.width = screenW;
            this.height = screenW / targetRatio;
        }

        this.x = (screenW - this.width) / 2;
        this.y = (screenH - this.height) / 2;
    }

    getDimensions() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }
}
