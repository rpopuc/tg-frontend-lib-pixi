import { SpriteSheet } from './SpriteSheet.js';

/**
 * Manages multiple {@link SpriteSheet} instances with async loading.
 *
 * @example
 * const sheets = new SpriteSheetManager();
 * sheets.load('dice', { image: diceTexture, columns: 6, rows: 1 });
 * sheets.load('cards', { image: cardsTexture, columns: 13, rows: 4 });
 * await sheets.whenReady();
 * const frame = sheets.get('dice').getFrameTexture(2);
 */
export class SpriteSheetManager {
    constructor() {
        /** @type {Map<string, SpriteSheet>} */
        this.sheets = new Map();
        /** @type {Map<string, Promise>} */
        this.promises = new Map();
    }

    /**
     * Start loading a sprite sheet. Non-blocking; use `whenReady()` to await.
     * @param {string} key - Unique identifier.
     * @param {Object} options - Options passed to {@link SpriteSheet} constructor.
     */
    load(key, options) {
        if (this.sheets.has(key)) return;

        const sheet = new SpriteSheet(options);
        const promise = sheet.load().then(() => {
            this.sheets.set(key, sheet);
        });

        this.promises.set(key, promise);
    }

    /**
     * @param {string} key
     * @returns {SpriteSheet|undefined}
     */
    get(key) {
        return this.sheets.get(key);
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return this.sheets.has(key);
    }

    /**
     * @param {string} key
     */
    unload(key) {
        this.sheets.delete(key);
        this.promises.delete(key);
    }

    clear() {
        this.sheets.clear();
        this.promises.clear();
    }

    /**
     * Wait for all pending sprite sheet loads to complete.
     * @returns {Promise<void>}
     */
    async whenReady() {
        await Promise.all([...this.promises.values()]);
    }
}
