export class EventEmitter {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!callback) return;
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    remove(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(c => c !== callback);
    }

    clear(event) {
        this.listeners[event] = [];
    }

    has(event) {
        return !!(this.listeners[event] && this.listeners[event].length > 0);
    }

    trigger(event, params) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => callback(params));
    }
}
