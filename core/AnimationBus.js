export class AnimationBus {
    constructor() {
        this.queue = [];
        this._promise = null;
    }

    addSequential(fn) {
        this.queue.push({ fn, mode: 'sequential' });
    }

    addParallel(fn) {
        this.queue.push({ fn, mode: 'parallel' });
    }

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
