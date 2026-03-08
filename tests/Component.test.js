import { jest } from '@jest/globals';
import '../tests/PixiMock.js';
import { Component } from '../core/Component.js';

describe('Component', () => {
    test('init stores data and calls draw', () => {
        const comp = new Component(null);
        const spy = jest.spyOn(comp, 'draw');
        comp.init({ value: 42 });

        expect(comp.data).toEqual({ value: 42 });
        expect(spy).toHaveBeenCalled();
    });

    test('update replaces data and redraws', () => {
        const comp = new Component(null);
        comp.init({ a: 1 });
        const spy = jest.spyOn(comp, 'draw');
        comp.update({ a: 2 });

        expect(comp.data).toEqual({ a: 2 });
        expect(spy).toHaveBeenCalled();
    });

    test('setState merges and redraws', () => {
        const comp = new Component(null);
        comp._state = { x: 1, y: 2 };
        const spy = jest.spyOn(comp, 'draw');
        comp.setState({ y: 3 });

        expect(comp.state).toEqual({ x: 1, y: 3 });
        expect(spy).toHaveBeenCalled();
    });

    test('destroyChildren removes all children', () => {
        const comp = new Component(null);
        comp.addChild({ destroy: jest.fn() });
        comp.addChild({ destroy: jest.fn() });

        expect(comp.children.length).toBe(2);
        comp.destroyChildren();
        expect(comp.children.length).toBe(0);
    });

    test('setComponentId and getter', () => {
        const comp = new Component(null);
        comp.setComponentId('my-comp');
        expect(comp.componentId).toBe('my-comp');
    });
});
