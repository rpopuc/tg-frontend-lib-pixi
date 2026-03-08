export class Font {
    constructor(options = {}) {
        this.fontFamily = options.fontFamily || 'sans-serif';
        this.fontSize = options.size || options.fontSize || 16;
        this.style = new PIXI.TextStyle(options);
        this.options = options;

        this._measureText = new PIXI.Text('', this.style);
    }

    getWidth(text) {
        this._measureText.text = text;
        return this._measureText.width;
    }

    getHeight() {
        this._measureText.text = 'Hg';
        return this._measureText.height;
    }

    getStyle(overrides = {}) {
        return new PIXI.TextStyle({
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            ...this.options,
            ...overrides,
        });
    }
}
