import { jest } from '@jest/globals';
import '../tests/PixiMock.js';
import { Button } from '../ui/Button.js';
import { ButtonStyle } from '../ui/ButtonStyle.js';

describe('Button', () => {
    test('creates with default style', () => {
        const btn = new Button('Click me');
        expect(btn.label.text).toBe('Click me');
        expect(btn.btnWidth).toBe(160);
        expect(btn.btnHeight).toBe(40);
    });

    test('creates with custom dimensions and style', () => {
        const style = new ButtonStyle({ bgColor: 0xff0000 });
        const btn = new Button('Ok', 200, 50, style);

        expect(btn.btnWidth).toBe(200);
        expect(btn.btnHeight).toBe(50);
        expect(btn.style.bgColor).toBe(0xff0000);
    });

    test('setLabel updates text', () => {
        const btn = new Button('A');
        btn.setLabel('B');
        expect(btn.label.text).toBe('B');
    });

    test('show and hide toggle visibility', () => {
        const btn = new Button('X');
        btn.hide();
        expect(btn.visible).toBe(false);
        btn.show();
        expect(btn.visible).toBe(true);
    });

    test('setEnabled toggles interactivity', () => {
        const btn = new Button('X');
        btn.setEnabled(false);
        expect(btn.interactive).toBe(false);
        expect(btn.cursor).toBe('default');
        btn.setEnabled(true);
        expect(btn.interactive).toBe(true);
        expect(btn.cursor).toBe('pointer');
    });

    test('emits EVENT_TAP on pointertap', () => {
        const btn = new Button('X');
        const handler = jest.fn();
        btn.on(Button.EVENT_TAP, handler);

        btn.emit('pointertap');
        expect(handler).toHaveBeenCalled();
    });
});
