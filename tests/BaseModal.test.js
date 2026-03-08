import { jest } from '@jest/globals';
import '../tests/PixiMock.js';
import { BaseModal } from '../ui/BaseModal.js';
import { Button } from '../ui/Button.js';

describe('BaseModal', () => {
    const world = { scale: { x: 1 }, x: 0, y: 0 };

    test('starts hidden', () => {
        const modal = new BaseModal(null, world);
        expect(modal.visible).toBe(false);
    });

    test('hide sets visible to false', () => {
        const modal = new BaseModal(null, world);
        modal.visible = true;
        modal.hide();
        expect(modal.visible).toBe(false);
    });

    test('_buildOverlay creates interactive overlay', () => {
        const modal = new BaseModal(null, world);
        modal._buildOverlay();
        expect(modal.overlay).toBeDefined();
        expect(modal.overlay.interactive).toBe(true);
    });

    test('_buildOverlay with dismissOnClick hides on tap', () => {
        const modal = new BaseModal(null, world);
        modal._buildOverlay({ dismissOnClick: true });
        modal.visible = true;
        modal.overlay.emit('pointertap');
        expect(modal.visible).toBe(false);
    });

    test('_buildContentBox creates container', () => {
        const modal = new BaseModal(null, world);
        modal._buildContentBox();
        expect(modal.contentBox).toBeDefined();
    });

    test('_buildButtonBar creates FlowLayout', () => {
        const modal = new BaseModal(null, world);
        const bar = modal._buildButtonBar();
        expect(bar).toBe(modal.buttonBar);
    });

    test('_createButton returns a Button and adds to buttonBar', () => {
        const modal = new BaseModal(null, world);
        modal._buildButtonBar();
        const clicked = jest.fn();
        const btn = modal._createButton('Ok', clicked);

        expect(btn).toBeInstanceOf(Button);
        expect(modal.buttonBar.children).toContain(btn);
    });

    test('_drawSeparator returns Graphics', () => {
        const modal = new BaseModal(null, world);
        const sep = modal._drawSeparator(100, 400);
        expect(sep).toBeInstanceOf(PIXI.Graphics);
    });

    test('_centerOnScreen positions contentBox', () => {
        const modal = new BaseModal(null, world, { logicalWidth: 800, logicalHeight: 600 });
        modal._buildContentBox();
        modal._centerOnScreen(200, 100);
        expect(modal.contentBox.x).toBe(300);
        expect(modal.contentBox.y).toBe(250);
    });
});
