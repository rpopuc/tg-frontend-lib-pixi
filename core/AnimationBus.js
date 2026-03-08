/**
 * Sequential and parallel animation orchestrator.
 *
 * Queue async functions and play them in order. Consecutive parallel
 * entries run together; a sequential entry waits for all preceding
 * parallels to finish before starting.
 *
 * @example
 * const bus = new AnimationBus();
 * bus.addParallel(() => fadeIn(sprite1));
 * bus.addParallel(() => fadeIn(sprite2));
 * bus.addSequential(() => slideUp(title));
 * await bus.play();
 */
export class AnimationBus {
    constructor() {
        /** @type {Array<{fn: function(): Promise, mode: string}>} */
        this.queue = [];
        this._promise = null;
    }

    /**
     * Add a function that runs concurrently with adjacent parallel entries.
     * @param {function(): Promise} fn
     */
    addParallel(fn) {
        this.queue.push({ fn, mode: 'parallel' });
    }

    /**
     * Add a function that runs only after all previous entries complete.
     * @param {function(): Promise} fn
     */
    addSequential(fn) {
        this.queue.push({ fn, mode: 'sequential' });
    }

    /**
     * Execute all queued animations. Calling play() again before
     * completion returns the same promise.
     * @returns {Promise<void>}
     */
    play() {
        if (this._promise) return this._promise;
        this._promise = this._execute();
        return this._promise;
    }

    async _execute() {
        let parallel = [];
        for (const entry of this.queue) {
            if (entry.mode === 'parallel') {
                parallel.push(entry.fn());
            } else {
                if (parallel.length) {
                    await Promise.all(parallel);
                    parallel = [];
                }
                await entry.fn();
            }
        }
        if (parallel.length) await Promise.all(parallel);
    }
}
