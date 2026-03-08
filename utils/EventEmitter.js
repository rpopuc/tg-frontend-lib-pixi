/**
 * Minimal event emitter for decoupled communication.
 *
 * @example
 * const emitter = new EventEmitter();
 * emitter.on('score-changed', ({ score }) => console.log(score));
 * emitter.trigger('score-changed', { score: 42 });
 */
export class EventEmitter {
    constructor() {
        /** @type {Object<string, function[]>} */
        this.listeners = {};
    }

    /**
     * Register a callback for an event.
     * @param {string} event
     * @param {function} callback
     */
    on(event, callback) {
        if (!callback) return;
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    /**
     * Remove a specific callback from an event.
     * @param {string} event
     * @param {function} callback
     */
    remove(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(c => c !== callback);
    }

    /**
     * Remove all callbacks for an event.
     * @param {string} event
     */
    clear(event) {
        this.listeners[event] = [];
    }

    /**
     * Check if an event has any listeners.
     * @param {string} event
     * @returns {boolean}
     */
    has(event) {
        return !!(this.listeners[event] && this.listeners[event].length > 0);
    }

    /**
     * Invoke all callbacks registered for an event.
     * @param {string} event
     * @param {*} [params] - Data passed to each callback.
     */
    trigger(event, params) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => callback(params));
    }
}
