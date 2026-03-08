import { Color } from '../utils/Color.js';

describe('Color', () => {
    describe('fromHex', () => {
        test('parses #rrggbb', () => {
            expect(Color.fromHex('#ff0000')).toEqual({ color: 0xff0000, alpha: 1 });
        });

        test('parses #rgb shorthand', () => {
            expect(Color.fromHex('#f00')).toEqual({ color: 0xff0000, alpha: 1 });
        });

        test('parses #rrggbbaa', () => {
            const result = Color.fromHex('#ff000080');
            expect(result.color).toBe(0xff0000);
            expect(result.alpha).toBeCloseTo(0.502, 2);
        });

        test('parses 0xRRGGBB string', () => {
            expect(Color.fromHex('0x00ff00')).toEqual({ color: 0x00ff00, alpha: 1 });
        });

        test('parses number', () => {
            expect(Color.fromHex(0x0000ff)).toEqual({ color: 0x0000ff, alpha: 1 });
        });

        test('returns fallback for invalid input', () => {
            expect(Color.fromHex('invalid')).toEqual({ color: 0xffffff, alpha: 1 });
            expect(Color.fromHex(null)).toEqual({ color: 0xffffff, alpha: 1 });
        });
    });

    describe('fromRGBA', () => {
        test('parses rgba string', () => {
            expect(Color.fromRGBA('rgba(255, 0, 0, 0.5)')).toEqual({ color: 0xff0000, alpha: 0.5 });
        });

        test('parses rgb string (no alpha)', () => {
            expect(Color.fromRGBA('rgb(0, 255, 0)')).toEqual({ color: 0x00ff00, alpha: 1 });
        });

        test('returns fallback for invalid string', () => {
            expect(Color.fromRGBA('not-a-color')).toEqual({ color: 0xffffff, alpha: 1 });
        });
    });

    describe('toRGBA', () => {
        test('converts to rgba string', () => {
            expect(Color.toRGBA(0xff0000, 0.5)).toBe('rgba(255,0,0,0.5)');
        });

        test('defaults alpha to 1', () => {
            expect(Color.toRGBA(0x00ff00)).toBe('rgba(0,255,0,1)');
        });
    });

    describe('fromValues', () => {
        test('converts normalized 0-1 values', () => {
            expect(Color.fromValues(1, 0, 0)).toEqual({ color: 0xff0000, alpha: 1 });
        });

        test('clamps out of range values', () => {
            const result = Color.fromValues(2, -1, 0.5, 0.8);
            expect(result.color).toBe((255 << 16) + (0 << 8) + 128);
            expect(result.alpha).toBe(0.8);
        });
    });

    describe('fromArray', () => {
        test('converts [r, g, b] array', () => {
            expect(Color.fromArray([255, 0, 0])).toEqual({ color: 0xff0000, alpha: 1 });
        });

        test('converts [r, g, b, a] array', () => {
            expect(Color.fromArray([0, 255, 0, 0.5])).toEqual({ color: 0x00ff00, alpha: 0.5 });
        });
    });
});
