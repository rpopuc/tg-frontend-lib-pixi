import { Component } from '../core/Component.js';

export class FlowLayout extends Component {
    constructor({ gap = 20, direction = 'horizontal', align = 'center' } = {}) {
        super(null);
        this.gap = gap;
        this.direction = direction;
        this.align = align;
    }

    layout() {
        const items = this.children.filter(c => c.visible);
        if (items.length === 0) return;

        const horizontal = this.direction === 'horizontal';
        const mainSize = (c) => horizontal ? (c.btnWidth ?? c.width) : (c.btnHeight ?? c.height);
        const crossSize = (c) => horizontal ? (c.btnHeight ?? c.height) : (c.btnWidth ?? c.width);

        const maxCross = Math.max(...items.map(crossSize));

        let pos = 0;
        for (const item of items) {
            const main = mainSize(item);
            const cross = crossSize(item);

            let crossOffset = 0;
            if (this.align === 'center') crossOffset = (maxCross - cross) / 2;
            else if (this.align === 'end') crossOffset = maxCross - cross;

            if (horizontal) {
                item.x = pos + main / 2;
                item.y = crossOffset;
            } else {
                item.x = crossOffset;
                item.y = pos + main / 2;
            }

            pos += main + this.gap;
        }
    }
}
