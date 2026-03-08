/**
 * Grid-based sprite sheet that divides an image into uniform frames.
 *
 * @example
 * const sheet = new SpriteSheet({ image: texture, columns: 4, rows: 2 });
 * await sheet.load();
 * const frame = sheet.getFrameTexture(3);
 * const sprite = new PIXI.Sprite(frame);
 */
export class SpriteSheet {
    /**
     * @param {Object} options
     * @param {PIXI.Texture} options.image - Source texture.
     * @param {number} options.columns - Number of columns in the grid.
     * @param {number} options.rows - Number of rows in the grid.
     * @param {number} [options.scale=1] - Scale factor for frame dimensions.
     */
    constructor({ image, columns, rows, scale = 1 }) {
        this.image = image;
        this.columns = columns;
        this.rows = rows;
        this.scale = scale;

        this.sheet = null;
        this.loaded = false;
    }

    /**
     * Parse the sprite sheet frames. Must be awaited before accessing textures.
     * @returns {Promise<void>}
     */
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

    /**
     * @returns {number} Total number of frames (columns * rows).
     */
    getTotalFrames() {
        return this.columns * this.rows;
    }

    /**
     * Get the texture for a specific frame index.
     * @param {number} index - Zero-based frame index (left-to-right, top-to-bottom).
     * @returns {PIXI.Texture}
     * @throws {Error} If the sheet has not been loaded yet.
     */
    getFrameTexture(index) {
        if (!this.loaded || !this.sheet) {
            throw new Error('SpriteSheet not loaded yet. Did you forget to await load()?');
        }
        return this.sheet.textures[`frame_${index}`];
    }

    /**
     * Get the scaled width of a single frame.
     * @param {number} [scale] - Override scale (defaults to constructor scale).
     * @returns {number}
     */
    getWidth(scale) {
        scale = scale ?? this.scale;
        return (this.image.width / this.columns) * scale;
    }

    /**
     * Get the scaled height of a single frame.
     * @param {number} [scale] - Override scale (defaults to constructor scale).
     * @returns {number}
     */
    getHeight(scale) {
        scale = scale ?? this.scale;
        return (this.image.height / this.rows) * scale;
    }
}
