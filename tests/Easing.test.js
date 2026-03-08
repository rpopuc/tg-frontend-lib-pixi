import { Easing } from '../utils/Easing.js';

describe('Easing', () => {
    const fns = [
        'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad',
        'easeInCubic', 'easeOutCubic', 'easeInOutCubic',
        'easeInSine', 'easeOutSine', 'easeInOutSine',
        'easeOutBack', 'easeOutBounce',
    ];

    test.each(fns)('%s returns 0 at t=0', (fn) => {
        expect(Easing[fn](0)).toBeCloseTo(0, 5);
    });

    test.each(fns)('%s returns 1 at t=1', (fn) => {
        expect(Easing[fn](1)).toBeCloseTo(1, 5);
    });

    test('linear is identity', () => {
        expect(Easing.linear(0.5)).toBe(0.5);
    });

    test('easeInQuad accelerates', () => {
        expect(Easing.easeInQuad(0.5)).toBe(0.25);
    });

    test('easeOutQuad decelerates', () => {
        expect(Easing.easeOutQuad(0.5)).toBe(0.75);
    });

    test('easeOutBack overshoots', () => {
        expect(Easing.easeOutBack(0.5)).toBeGreaterThan(0.5);
    });
});
