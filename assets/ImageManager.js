/**
 * Manages image/texture loading and caching via `PIXI.Assets`.
 *
 * @example
 * const images = new ImageManager();
 * await images.load('hero', '/sprites/hero.png');
 * const texture = images.get('hero');
 * const sprite = new PIXI.Sprite(texture);
 */
export class ImageManager {
    constructor() {
        /** @type {Object<string, PIXI.Texture>} */
        this.images = {};
        /** @type {Map<string, Promise>} */
        this.promises = new Map();
    }

    /**
     * Load an image and cache the resulting texture.
     * @param {string} key - Unique identifier for retrieval.
     * @param {string} url - Image URL.
     * @returns {Promise<void>}
     */
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

    /**
     * Retrieve a loaded texture by key.
     * @param {string} key
     * @returns {PIXI.Texture|undefined}
     */
    get(key) {
        const texture = this.images[key];
        if (!texture) {
            console.warn(`Image '${key}' has not been loaded.`);
        }
        return texture;
    }

    /**
     * Check if a texture is loaded.
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return !!this.images[key];
    }

    /**
     * Remove a texture from the cache.
     * @param {string} key
     */
    unload(key) {
        delete this.images[key];
        this.promises.delete(key);
    }

    /**
     * Remove all cached textures.
     */
    clear() {
        this.images = {};
        this.promises.clear();
    }

    /**
     * Wait for all pending loads to complete.
     * @returns {Promise<void>}
     */
    async whenReady() {
        await Promise.all([...this.promises.values()]);
    }
}
