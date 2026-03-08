import { EventEmitter } from '../utils/EventEmitter.js';

describe('EventEmitter', () => {
    test('triggers listeners', () => {
        const emitter = new EventEmitter();
        const result = [];
        emitter.on('test', (v) => result.push(v));
        emitter.trigger('test', 42);
        expect(result).toEqual([42]);
    });

    test('supports multiple listeners', () => {
        const emitter = new EventEmitter();
        const result = [];
        emitter.on('test', () => result.push('a'));
        emitter.on('test', () => result.push('b'));
        emitter.trigger('test');
        expect(result).toEqual(['a', 'b']);
    });

    test('remove removes specific listener', () => {
        const emitter = new EventEmitter();
        const result = [];
        const fn = () => result.push('x');
        emitter.on('test', fn);
        emitter.on('test', () => result.push('y'));
        emitter.remove('test', fn);
        emitter.trigger('test');
        expect(result).toEqual(['y']);
    });

    test('clear removes all listeners for event', () => {
        const emitter = new EventEmitter();
        const result = [];
        emitter.on('test', () => result.push('a'));
        emitter.clear('test');
        emitter.trigger('test');
        expect(result).toEqual([]);
    });

    test('has returns true when listeners exist', () => {
        const emitter = new EventEmitter();
        expect(emitter.has('test')).toBe(false);
        emitter.on('test', () => {});
        expect(emitter.has('test')).toBe(true);
    });

    test('trigger on unknown event is safe', () => {
        const emitter = new EventEmitter();
        expect(() => emitter.trigger('unknown')).not.toThrow();
    });

    test('on ignores null callback', () => {
        const emitter = new EventEmitter();
        emitter.on('test', null);
        expect(emitter.has('test')).toBe(false);
    });
});
