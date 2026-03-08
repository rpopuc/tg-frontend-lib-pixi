import '../tests/PixiMock.js';
import { FlowLayout } from '../ui/FlowLayout.js';

function makeItem(width, height, visible = true) {
    const item = new PIXI.Container();
    item.btnWidth = width;
    item.btnHeight = height;
    item.visible = visible;
    return item;
}

describe('FlowLayout', () => {
    describe('basic horizontal', () => {
        test('positions visible children', () => {
            const layout = new FlowLayout({ gap: 10 });
            const a = makeItem(100, 40);
            const b = makeItem(80, 40);
            layout.addChild(a);
            layout.addChild(b);
            layout.layout();

            expect(a.x).toBe(50);
            expect(b.x).toBe(150);
        });

        test('skips hidden children', () => {
            const layout = new FlowLayout({ gap: 10 });
            const a = makeItem(100, 40);
            const b = makeItem(80, 40, false);
            const c = makeItem(60, 40);
            layout.addChild(a);
            layout.addChild(b);
            layout.addChild(c);
            layout.layout();

            expect(a.x).toBe(50);
            expect(c.x).toBe(140);
        });

        test('centers items on cross axis by default', () => {
            const layout = new FlowLayout({ gap: 10 });
            const a = makeItem(100, 20);
            const b = makeItem(100, 40);
            layout.addChild(a);
            layout.addChild(b);
            layout.layout();

            expect(a.y).toBe(10);
            expect(b.y).toBe(0);
        });
    });

    describe('vertical direction', () => {
        test('positions vertically', () => {
            const layout = new FlowLayout({ gap: 10, direction: 'vertical' });
            const a = makeItem(100, 40);
            const b = makeItem(100, 60);
            layout.addChild(a);
            layout.addChild(b);
            layout.layout();

            expect(a.y).toBe(20);
            expect(b.y).toBe(80);
        });
    });

    describe('justify', () => {
        test('center justifies within container', () => {
            const layout = new FlowLayout({ gap: 0, justify: 'center', width: 300 });
            const a = makeItem(100, 40);
            layout.addChild(a);
            layout.layout();

            expect(a.x).toBe(150);
        });

        test('end aligns to container end', () => {
            const layout = new FlowLayout({ gap: 0, justify: 'end', width: 300 });
            const a = makeItem(100, 40);
            layout.addChild(a);
            layout.layout();

            expect(a.x).toBe(250);
        });

        test('between distributes space between items', () => {
            const layout = new FlowLayout({ gap: 0, justify: 'between', width: 300 });
            const a = makeItem(50, 40);
            const b = makeItem(50, 40);
            layout.addChild(a);
            layout.addChild(b);
            layout.layout();

            expect(a.x).toBe(25);
            expect(b.x).toBe(275);
        });

        test('around distributes space around items', () => {
            const layout = new FlowLayout({ gap: 0, justify: 'around', width: 300 });
            const a = makeItem(50, 40);
            const b = makeItem(50, 40);
            layout.addChild(a);
            layout.addChild(b);
            layout.layout();

            const gap = 200 / 3;
            expect(a.x).toBeCloseTo(gap + 25, 1);
            expect(b.x).toBeCloseTo(gap * 2 + 50 + 25, 1);
        });
    });

    describe('wrap', () => {
        test('wraps to next line when exceeding width', () => {
            const layout = new FlowLayout({ gap: 10, wrap: true, width: 200 });
            const a = makeItem(100, 40);
            const b = makeItem(100, 40);
            const c = makeItem(80, 40);
            layout.addChild(a);
            layout.addChild(b);
            layout.addChild(c);
            layout.layout();

            expect(a.y).toBe(0);
            expect(b.y).toBe(40 + 10);
            expect(c.y).toBe(40 + 10);
        });

        test('does not wrap when disabled', () => {
            const layout = new FlowLayout({ gap: 10 });
            const a = makeItem(100, 40);
            const b = makeItem(100, 40);
            layout.addChild(a);
            layout.addChild(b);
            layout.layout();

            expect(a.y).toBe(0);
            expect(b.y).toBe(0);
        });
    });

    describe('gap object', () => {
        test('accepts separate x/y gaps', () => {
            const layout = new FlowLayout({ gap: { x: 20, y: 5 } });
            const a = makeItem(100, 40);
            const b = makeItem(100, 40);
            layout.addChild(a);
            layout.addChild(b);
            layout.layout();

            expect(b.x).toBe(a.x + 100 + 20);
        });
    });

    describe('edge cases', () => {
        test('handles empty layout', () => {
            const layout = new FlowLayout();
            layout.layout();
        });

        test('handles single item', () => {
            const layout = new FlowLayout({ gap: 10 });
            const a = makeItem(100, 40);
            layout.addChild(a);
            layout.layout();

            expect(a.x).toBe(50);
            expect(a.y).toBe(0);
        });
    });
});
