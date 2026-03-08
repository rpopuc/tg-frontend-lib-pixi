import { Font } from './Font.js';

/**
 * Manages font loading and provides {@link Font} instances.
 *
 * Supports loading web fonts from URL (via `FontFace` API) or
 * creating Font objects from inline options.
 *
 * @example
 * const fonts = new FontManager();
 * await fonts.load('title', { url: '/fonts/Title.woff2', fontFamily: 'TitleFont', size: 32 });
 * await fonts.load('body', { fontFamily: 'Arial', size: 16, fill: 0xffffff });
 * const style = fonts.get('title').getStyle({ fill: 0xff0000 });
 */
export class FontManager {
    constructor() {
        /** @type {Map<string, Font>} */
        this.fonts = new Map();
    }

    /**
     * Load or register a font.
     *
     * If `options.url` is provided, loads the web font via `FontFace` API
     * before creating the Font object. Otherwise creates a Font from the
     * given options directly.
     *
     * @param {string} key - Unique identifier.
     * @param {Object} [options]
     * @param {string} [options.url] - Web font URL (.woff2, .ttf, etc.)
     * @param {string} [options.fontFamily] - Font family name.
     * @param {number} [options.size=16] - Font size in pixels.
     * @param {string} [options.weight='normal']
     * @param {string} [options.style='normal']
     * @returns {Promise<void>}
     */
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

    /**
     * Retrieve a loaded Font by key.
     * @param {string} key
     * @returns {Font|undefined}
     */
    get(key) {
        return this.fonts.get(key);
    }

    /**
     * Check if a font is registered.
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return this.fonts.has(key);
    }
}
