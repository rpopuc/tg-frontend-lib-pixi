import { Draggable } from './Draggable.js';

/**
 * Convenience wrapper to make a container draggable.
 *
 * @param {PIXI.Container} target
 * @param {Object} [options] - Same options as {@link Draggable}.
 * @returns {Draggable}
 *
 * @example
 * const handle = makeDraggable(sprite, { deadZone: 5 });
 * // later: handle.destroy();
 */
export function makeDraggable(target, options = {}) {
    return new Draggable(target, options);
}
