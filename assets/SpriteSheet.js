export class SpriteSheet {
    constructor({ image, columns, rows, scale = 1 }) {
        this.image = image;
        this.columns = columns;
        this.rows = rows;
        this.scale = scale;

        this.sheet = null;
        this.loaded = false;
    }

    async load() {
        const frameWidth = this.image.width / this.columns;
        const frameHeight = this.image.height / this.rows;

        const frames = {};
        let index = 0;

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                frames[`frame_${index}`] = {
                    frame: {
                        x: x * frameWidth,
                        y: y * frameHeight,
                        w: frameWidth,
                        h: frameHeight,
                    },
                };
                index++;
            }
        }

        const json = {
            frames,
            meta: {
                image: '',
                scale: String(this.scale),
                size: { w: this.image.width, h: this.image.height },
            },
        };

        this.sheet = new PIXI.Spritesheet(this.image.baseTexture, json);
        await this.sheet.parse();
        this.loaded = true;
    }

    getTotalFrames() {
        return this.columns * this.rows;
    }

    getFrameTexture(index) {
        if (!this.loaded || !this.sheet) {
            throw new Error('SpriteSheet not loaded yet. Did you forget to await load()?');
        }
        return this.sheet.textures[`frame_${index}`];
    }

    getWidth(scale) {
        scale = scale ?? this.scale;
        return (this.image.width / this.columns) * scale;
    }

    getHeight(scale) {
        scale = scale ?? this.scale;
        return (this.image.height / this.rows) * scale;
    }
}
