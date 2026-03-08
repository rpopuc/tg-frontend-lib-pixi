import { MathUtils } from '../utils/MathUtils.js';

describe('MathUtils', () => {
    test('lerp interpolates between values', () => {
        expect(MathUtils.lerp(0, 10, 0.5)).toBe(5);
        expect(MathUtils.lerp(0, 10, 0)).toBe(0);
        expect(MathUtils.lerp(0, 10, 1)).toBe(10);
    });

    test('lerpPosition interpolates x and y', () => {
        const result = MathUtils.lerpPosition({ x: 0, y: 0 }, { x: 10, y: 20 }, 0.5);
        expect(result).toEqual({ x: 5, y: 10 });
    });

    test('lerpColor interpolates RGBA arrays', () => {
        const result = MathUtils.lerpColor([0, 0, 0, 0], [100, 200, 50, 1], 0.5);
        expect(result).toEqual([50, 100, 25, 0.5]);
    });

    test('clamp constrains value to range', () => {
        expect(MathUtils.clamp(5, 0, 10)).toBe(5);
        expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
        expect(MathUtils.clamp(15, 0, 10)).toBe(10);
    });

    test('normalize maps value to 0-1 range', () => {
        expect(MathUtils.normalize(5, 0, 10)).toBe(0.5);
        expect(MathUtils.normalize(0, 0, 10)).toBe(0);
        expect(MathUtils.normalize(10, 0, 10)).toBe(1);
    });

    test('map transforms between ranges', () => {
        expect(MathUtils.map(5, 0, 10, 0, 100)).toBe(50);
        expect(MathUtils.map(0.5, 0, 1, -10, 10)).toBe(0);
    });

    test('distance calculates euclidean distance', () => {
        expect(MathUtils.distance(0, 0, 3, 4)).toBe(5);
        expect(MathUtils.distance(0, 0, 0, 0)).toBe(0);
    });

    test('roundTo rounds to decimals', () => {
        expect(MathUtils.roundTo(3.14159, 2)).toBe(3.14);
        expect(MathUtils.roundTo(3.5)).toBe(4);
    });

    test('random returns integer in range', () => {
        for (let i = 0; i < 50; i++) {
            const val = MathUtils.random(10, 5);
            expect(val).toBeGreaterThanOrEqual(5);
            expect(val).toBeLessThan(10);
        }
    });

    test('cycle wraps around', () => {
        expect(MathUtils.cycle(0, 3)).toBe(1);
        expect(MathUtils.cycle(2, 3)).toBe(0);
    });
});
