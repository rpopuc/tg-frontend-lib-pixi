import { Draggable } from './Draggable.js';

export function makeDraggable(target, options = {}) {
    return new Draggable(target, options);
}
