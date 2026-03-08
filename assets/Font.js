/**
 * Wraps `PIXI.TextStyle` with text measurement utilities.
 *
 * @example
 * const font = new Font({ fontFamily: 'Arial', size: 24, fill: 0xffffff });
 * const width = font.getWidth('Hello');
 * const style = font.getStyle({ fill: 0xff0000 }); // override color
 */
export class Font {
    /**
     * @param {Object} [options] - Options passed to `PIXI.TextStyle` plus `size` alias for `fontSize`.
     */
    constructor(options = {}) {
        this.fontFamily = options.fontFamily || 'sans-serif';
        this.fontSize = options.size || options.fontSize || 16;
        this.style = new PIXI.TextStyle(options);
        this.options = options;

        this._measureText = new PIXI.Text('', this.style);
    }

    /**
     * Measure the rendered width of a text string.
     * @param {string} text
     * @returns {number}
     */
    getWidth(text) {
        this._measureText.text = text;
        return this._measureText.width;
    }

    /**
     * Measure the rendered line height.
     * @returns {number}
     */
    getHeight() {
        this._measureText.text = 'Hg';
        return this._measureText.height;
    }

    /**
     * Create a new `PIXI.TextStyle` based on this font with optional overrides.
     * @param {Object} [overrides] - Properties to override (fill, align, stroke, etc.)
     * @returns {PIXI.TextStyle}
     */
    getStyle(overrides = {}) {
        return new PIXI.TextStyle({
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            ...this.options,
            ...overrides,
        });
    }
}
