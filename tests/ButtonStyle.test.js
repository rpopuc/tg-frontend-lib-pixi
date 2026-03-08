import { ButtonStyle } from '../ui/ButtonStyle.js';

describe('ButtonStyle', () => {
    test('uses default values', () => {
        const style = new ButtonStyle();
        expect(style.bgColor).toBe(0x666666);
        expect(style.bgHoverColor).toBe(0x888888);
        expect(style.borderColor).toBe(0x444444);
        expect(style.borderWidth).toBe(2);
        expect(style.radius).toBe(8);
        expect(style.textColor).toBe(0xffffff);
        expect(style.fontFamily).toBe('sans-serif');
        expect(style.fontSize).toBe(16);
    });

    test('accepts custom values', () => {
        const style = new ButtonStyle({ bgColor: 0xff0000, fontSize: 24 });
        expect(style.bgColor).toBe(0xff0000);
        expect(style.fontSize).toBe(24);
        expect(style.borderColor).toBe(0x444444);
    });
});
