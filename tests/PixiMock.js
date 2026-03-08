class Container {
    constructor() {
        this.children = [];
        this.x = 0;
        this.y = 0;
        this.visible = true;
        this.interactive = false;
        this.cursor = 'default';
        this._scale = { x: 1, y: 1, set(v) { this.x = v; this.y = v; } };
        this._listeners = {};
    }

    get scale() { return this._scale; }

    addChild(child) {
        this.children.push(child);
        return child;
    }

    removeChild(child) {
        const idx = this.children.indexOf(child);
        if (idx >= 0) this.children.splice(idx, 1);
        return child;
    }

    on(event, fn) {
        if (!this._listeners[event]) this._listeners[event] = [];
        this._listeners[event].push(fn);
        return this;
    }

    off(event, fn) {
        if (this._listeners[event]) {
            this._listeners[event] = this._listeners[event].filter(f => f !== fn);
        }
        return this;
    }

    emit(event, ...args) {
        (this._listeners[event] || []).forEach(fn => fn(...args));
    }

    destroy() {}
}

class Graphics extends Container {
    clear() { return this; }
    lineStyle() { return this; }
    beginFill() { return this; }
    endFill() { return this; }
    drawRoundedRect() { return this; }
    drawPolygon() { return this; }
    roundRect() { return this; }
    fill() { return this; }
    rect() { return this; }
    moveTo() { return this; }
    lineTo() { return this; }
    stroke() { return this; }
}

class Text extends Container {
    constructor(text, style) {
        super();
        this.text = text;
        this.style = { ...style };
        this.anchor = { set() {} };
        this.width = text.length * 8;
    }
}

globalThis.PIXI = { Container, Graphics, Text };
