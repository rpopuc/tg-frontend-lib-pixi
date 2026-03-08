import { jest } from '@jest/globals';
import { LayoutManager } from '../core/LayoutManager.js';

describe('LayoutManager', () => {
    function makeApp() {
        return { renderer: { resize: jest.fn() } };
    }

    function makeWorld() {
        const s = { x: 1, y: 1, set(v) { this.x = v; this.y = v; } };
        return { scale: s, x: 0, y: 0 };
    }

    beforeEach(() => {
        globalThis.window = {
            innerWidth: 800,
            innerHeight: 600,
            addEventListener: jest.fn(),
        };
    });

    test('resize scales and centers world', () => {
        const app = makeApp();
        const world = makeWorld();
        const lm = new LayoutManager(app, world, { logicalWidth: 800, logicalHeight: 400 });

        globalThis.window.innerWidth = 800;
        globalThis.window.innerHeight = 400;
        lm.resize();

        expect(world.scale.x).toBe(1);
        expect(world.x).toBe(0);
        expect(world.y).toBe(0);
        expect(app.renderer.resize).toHaveBeenCalledWith(800, 400);
    });

    test('resize scales down to fit', () => {
        const app = makeApp();
        const world = makeWorld();
        const lm = new LayoutManager(app, world, { logicalWidth: 1600, logicalHeight: 900 });

        globalThis.window.innerWidth = 800;
        globalThis.window.innerHeight = 450;
        lm.resize();

        expect(world.scale.x).toBe(0.5);
    });

    test('centers world when aspect ratios differ', () => {
        const app = makeApp();
        const world = makeWorld();
        const lm = new LayoutManager(app, world, { logicalWidth: 100, logicalHeight: 100 });

        globalThis.window.innerWidth = 200;
        globalThis.window.innerHeight = 100;
        lm.resize();

        expect(world.scale.x).toBe(1);
        expect(world.x).toBe(50);
        expect(world.y).toBe(0);
    });

    test('registers resize event on window', () => {
        const app = makeApp();
        const world = makeWorld();
        new LayoutManager(app, world);
        expect(globalThis.window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
