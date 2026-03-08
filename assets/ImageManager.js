export class ImageManager {
    constructor() {
        this.images = {};
        this.promises = new Map();
    }

    async load(key, url) {
        if (this.images[key]) return;

        const promise = PIXI.Assets.load(url)
            .then(texture => {
                this.images[key] = texture;
            })
            .catch(err => {
                console.error(`Failed to load image "${key}": ${url}`, err);
            });

        this.promises.set(key, promise);
        await promise;
    }

    get(key) {
        const texture = this.images[key];
        if (!texture) {
            console.warn(`Image '${key}' has not been loaded.`);
        }
        return texture;
    }

    has(key) {
        return !!this.images[key];
    }

    unload(key) {
        delete this.images[key];
        this.promises.delete(key);
    }

    clear() {
        this.images = {};
        this.promises.clear();
    }

    async whenReady() {
        await Promise.all([...this.promises.values()]);
    }
}
