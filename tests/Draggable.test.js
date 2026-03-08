import { jest } from '@jest/globals';
import '../tests/PixiMock.js';
import { Draggable } from '../interaction/Draggable.js';

function makeTarget() {
    const target = new PIXI.Container();
    target.eventMode = null;
    target.parent = {
        toLocal: ({ x, y }) => ({ x, y }),
    };
    return target;
}

function pointerDown(target, x = 0, y = 0) {
    const handler = target._listeners['pointerdown']?.[0];
    handler?.({ clientX: x, clientY: y });
}

describe('Draggable', () => {
    let listeners;

    beforeEach(() => {
        listeners = {};
        globalThis.window = {
            addEventListener: jest.fn((event, fn) => {
                if (!listeners[event]) listeners[event] = [];
                listeners[event].push(fn);
            }),
            removeEventListener: jest.fn((event, fn) => {
                if (listeners[event]) {
                    listeners[event] = listeners[event].filter(f => f !== fn);
                }
            }),
        };
    });

    test('sets eventMode and cursor on target', () => {
        const target = makeTarget();
        new Draggable(target);
        expect(target.eventMode).toBe('static');
        expect(target.cursor).toBe('pointer');
    });

    test('moves target on pointer move', () => {
        const target = makeTarget();
        target.x = 100;
        target.y = 50;
        new Draggable(target);

        pointerDown(target, 100, 50);

        const moveHandler = listeners['pointermove']?.[0];
        moveHandler?.({ clientX: 120, clientY: 70 });

        expect(target.x).toBe(120);
        expect(target.y).toBe(70);
    });

    test('calls onStart, onMove, onEnd callbacks', () => {
        const onStart = jest.fn();
        const onMove = jest.fn();
        const onEnd = jest.fn();
        const target = makeTarget();
        new Draggable(target, { onStart, onMove, onEnd });

        pointerDown(target, 0, 0);
        listeners['pointermove'][0]({ clientX: 10, clientY: 10 });
        listeners['pointerup'][0]({});

        expect(onStart).toHaveBeenCalled();
        expect(onMove).toHaveBeenCalled();
        expect(onEnd).toHaveBeenCalled();
    });

    test('respects deadZone before starting drag', () => {
        const onStart = jest.fn();
        const target = makeTarget();
        new Draggable(target, { onStart, deadZone: 20 });

        pointerDown(target, 0, 0);
        listeners['pointermove'][0]({ clientX: 5, clientY: 5 });

        expect(onStart).not.toHaveBeenCalled();
        expect(target.x).toBe(0);

        listeners['pointermove'][0]({ clientX: 25, clientY: 0 });
        expect(onStart).toHaveBeenCalled();
    });

    test('does not call onEnd if drag never started (deadZone)', () => {
        const onEnd = jest.fn();
        const target = makeTarget();
        new Draggable(target, { onEnd, deadZone: 50 });

        pointerDown(target, 0, 0);
        listeners['pointermove'][0]({ clientX: 5, clientY: 5 });
        listeners['pointerup'][0]({});

        expect(onEnd).not.toHaveBeenCalled();
    });

    test('cleans up window listeners on pointer up', () => {
        const target = makeTarget();
        new Draggable(target);

        pointerDown(target, 0, 0);
        expect(listeners['pointermove'].length).toBe(1);

        listeners['pointerup'][0]({});
        expect(window.removeEventListener).toHaveBeenCalledWith('pointermove', expect.any(Function));
        expect(window.removeEventListener).toHaveBeenCalledWith('pointerup', expect.any(Function));
    });

    test('destroy removes all listeners', () => {
        const target = makeTarget();
        const draggable = new Draggable(target);

        pointerDown(target, 0, 0);
        draggable.destroy();

        expect(window.removeEventListener).toHaveBeenCalledWith('pointermove', expect.any(Function));
        expect(window.removeEventListener).toHaveBeenCalledWith('pointerup', expect.any(Function));
    });
});
