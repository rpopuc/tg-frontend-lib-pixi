import { AnimationBus } from '../core/AnimationBus.js';

describe('AnimationBus', () => {
    test('executes sequential animations in order', async () => {
        const order = [];
        const bus = new AnimationBus();

        bus.addSequential(() => { order.push(1); });
        bus.addSequential(() => { order.push(2); });
        bus.addSequential(() => { order.push(3); });

        await bus.play();
        expect(order).toEqual([1, 2, 3]);
    });

    test('executes parallel animations concurrently', async () => {
        const order = [];
        const bus = new AnimationBus();

        bus.addParallel(() => new Promise(r => setTimeout(() => { order.push('a'); r(); }, 30)));
        bus.addParallel(() => new Promise(r => setTimeout(() => { order.push('b'); r(); }, 10)));

        await bus.play();
        expect(order).toEqual(['b', 'a']);
    });

    test('waits for parallel group before running next sequential', async () => {
        const order = [];
        const bus = new AnimationBus();

        bus.addParallel(() => new Promise(r => setTimeout(() => { order.push('p1'); r(); }, 20)));
        bus.addParallel(() => new Promise(r => setTimeout(() => { order.push('p2'); r(); }, 10)));
        bus.addSequential(() => { order.push('seq'); });

        await bus.play();
        expect(order).toEqual(['p2', 'p1', 'seq']);
    });

    test('play returns same promise if called twice', () => {
        const bus = new AnimationBus();
        bus.addSequential(() => {});
        const p1 = bus.play();
        const p2 = bus.play();
        expect(p1).toBe(p2);
    });

    test('handles empty queue', async () => {
        const bus = new AnimationBus();
        await bus.play();
    });
});
