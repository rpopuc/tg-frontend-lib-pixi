export class Component extends PIXI.Container {
    constructor(assets) {
        super();
        this.assets = assets;
        this._data = null;
        this._state = {};
        this._componentId = null;
    }

    init(data = null) {
        if (data) this._data = data;
        this.draw();
        return this;
    }

    update(data) {
        this._data = data;
        this.draw();
    }

    draw() {}

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

    get data() {
        return this._data;
    }

    get state() {
        return this._state;
    }

    get componentId() {
        return this._componentId;
    }

    setComponentId(id) {
        this._componentId = id;
    }

    setState(partial) {
        Object.assign(this._state, partial);
        this.draw();
    }
}
