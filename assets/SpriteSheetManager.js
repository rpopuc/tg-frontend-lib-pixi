import { SpriteSheet } from './SpriteSheet.js';

export class SpriteSheetManager {
    constructor() {
        this.sheets = new Map();
        this.promises = new Map();
    }

    load(key, options) {
        if (this.sheets.has(key)) return;

        const sheet = new SpriteSheet(options);
        const promise = sheet.load().then(() => {
            this.sheets.set(key, sheet);
        });

        this.promises.set(key, promise);
    }

    get(key) {
        return this.sheets.get(key);
    }

    has(key) {
        return this.sheets.has(key);
    }

    unload(key) {
        this.sheets.delete(key);
        this.promises.delete(key);
    }

    clear() {
        this.sheets.clear();
        this.promises.clear();
    }

    async whenReady() {
        await Promise.all([...this.promises.values()]);
    }
}
