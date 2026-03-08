/**
 * Base class for PixiJS components with data/state lifecycle.
 *
 * Extends `PIXI.Container` and adds a simple init/update/draw cycle
 * with optional state management.
 *
 * @example
 * class ScoreDisplay extends Component {
 *     draw() {
 *         this.destroyChildren();
 *         const text = new PIXI.Text(`Score: ${this.data.score}`);
 *         this.addChild(text);
 *     }
 * }
 * const display = new ScoreDisplay().init({ score: 0 });
 * display.update({ score: 42 });
 */
export class Component extends PIXI.Container {
    /**
     * @param {*} [assets] - Shared asset registry (images, fonts, etc.)
     */
    constructor(assets) {
        super();
        this.assets = assets;
        this._data = null;
        this._state = {};
        this._componentId = null;
    }

    /**
     * Initialize the component with optional data and trigger the first draw.
     * @param {*} [data]
     * @returns {this}
     */
    init(data = null) {
        if (data) this._data = data;
        this.draw();
        return this;
    }

    /**
     * Replace the component data and redraw.
     * @param {*} data
     */
    update(data) {
        this._data = data;
        this.draw();
    }

    /**
     * Override in subclasses to render the component based on `this.data` and `this.state`.
     */
    draw() {}

    /**
     * Remove and destroy all children.
     */
    destroyChildren() {
        while (this.children.length > 0) {
            const child = this.children[0];
            this.removeChild(child);
            if (child.destroy) child.destroy({ children: true });
        }
    }

    destroy(options) {
        super.destroy(options);
    }

    /** @type {*} */
    get data() {
        return this._data;
    }

    /** @type {Object} */
    get state() {
        return this._state;
    }

    /** @type {string|null} */
    get componentId() {
        return this._componentId;
    }

    /**
     * @param {string} id
     */
    setComponentId(id) {
        this._componentId = id;
    }

    /**
     * Merge partial state into the current state and redraw.
     * @param {Object} partial
     */
    setState(partial) {
        Object.assign(this._state, partial);
        this.draw();
    }
}
