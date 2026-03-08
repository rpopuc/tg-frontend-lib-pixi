import { Font } from './Font.js';

export class FontManager {
    constructor() {
        this.fonts = new Map();
    }

    async load(key, options = {}) {
        if (options.url) {
            const fontFace = new FontFace(options.fontFamily || key, `url(${options.url})`, {
                weight: options.weight || 'normal',
                style: options.style || 'normal',
            });

            await fontFace.load();
            document.fonts.add(fontFace);

            const font = new Font({
                fontFamily: fontFace.family,
                size: options.size || 16,
            });

            this.fonts.set(key, font);
            return;
        }

        const font = new Font(options);
        this.fonts.set(key, font);
    }

    get(key) {
        return this.fonts.get(key);
    }

    has(key) {
        return this.fonts.has(key);
    }
}
