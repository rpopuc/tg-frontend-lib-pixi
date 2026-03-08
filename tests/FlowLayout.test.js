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
    test('positions visible children horizontally', () => {
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

    test('supports vertical direction', () => {
        const layout = new FlowLayout({ gap: 10, direction: 'vertical' });
        const a = makeItem(100, 40);
        const b = makeItem(100, 60);
        layout.addChild(a);
        layout.addChild(b);
        layout.layout();

        expect(a.y).toBe(20);
        expect(b.y).toBe(80);
    });

    test('handles empty layout', () => {
        const layout = new FlowLayout();
        layout.layout();
    });
});
