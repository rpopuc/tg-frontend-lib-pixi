import { Component } from '../core/Component.js';

/**
 * Flexbox-like layout for PixiJS containers.
 *
 * Positions visible children in a row or column with configurable gap,
 * justify (start/center/end/between/around), align, and optional wrapping.
 *
 * @example
 * const bar = new FlowLayout({ gap: 16, direction: 'horizontal', justify: 'center', width: 800 });
 * bar.addChild(btnA);
 * bar.addChild(btnB);
 * bar.layout();
 */
export class FlowLayout extends Component {
    /**
     * @param {Object} [options]
     * @param {number|{x: number, y: number}} [options.gap=20] - Space between items. Pass an object for separate x/y gaps.
     * @param {'horizontal'|'vertical'} [options.direction='horizontal'] - Main axis direction.
     * @param {'start'|'center'|'end'|'between'|'around'} [options.justify='start'] - Main axis alignment.
     * @param {'start'|'center'|'end'} [options.align='center'] - Cross axis alignment.
     * @param {boolean} [options.wrap=false] - Wrap to next line when exceeding container size.
     * @param {number} [options.width=0] - Container width (required for justify/wrap in horizontal mode).
     * @param {number} [options.height=0] - Container height (required for justify/wrap in vertical mode).
     */
    constructor({
        gap = 20,
        direction = 'horizontal',
        justify = 'start',
        align = 'center',
        wrap = false,
        width = 0,
        height = 0,
    } = {}) {
        super(null);
        this.direction = direction;
        this.justify = justify;
        this.align = align;
        this.wrap = wrap;
        this.layoutWidth = width;
        this.layoutHeight = height;
        this._gap = typeof gap === 'object' ? gap : { x: gap, y: gap };
    }

    get gap() { return this._gap; }
    set gap(value) {
        this._gap = typeof value === 'object' ? value : { x: value, y: value };
    }

    /**
     * Recalculate positions of all visible children.
     */
    layout() {
        const items = this.children.filter(c => c.visible);
        if (items.length === 0) return;

        const horizontal = this.direction === 'horizontal';
        const mainProp = horizontal ? 'width' : 'height';
        const crossProp = horizontal ? 'height' : 'width';
        const mainAxis = horizontal ? 'x' : 'y';
        const crossAxis = horizontal ? 'y' : 'x';
        const mainGap = horizontal ? this._gap.x : this._gap.y;
        const crossGap = horizontal ? this._gap.y : this._gap.x;
        const containerMain = horizontal ? this.layoutWidth : this.layoutHeight;
        const containerCross = horizontal ? this.layoutHeight : this.layoutWidth;

        const mainSize = (c) => c.btnWidth !== undefined && horizontal ? c.btnWidth
            : c.btnHeight !== undefined && !horizontal ? c.btnHeight
            : c[mainProp] ?? 0;
        const crossSize = (c) => c.btnHeight !== undefined && horizontal ? c.btnHeight
            : c.btnWidth !== undefined && !horizontal ? c.btnWidth
            : c[crossProp] ?? 0;

        const lines = this._buildLines(items, mainSize, containerMain, mainGap);
        const lineMetrics = lines.map(line => ({
            items: line,
            maxCross: Math.max(...line.map(crossSize)),
            totalMain: line.reduce((sum, c) => sum + mainSize(c), 0),
        }));

        const totalCross = lineMetrics.reduce((sum, l) => sum + l.maxCross, 0)
            + (lineMetrics.length - 1) * crossGap;
        let crossOffset = 0;
        if (containerCross > 0 && this.align === 'center') crossOffset = (containerCross - totalCross) / 2;
        else if (containerCross > 0 && this.align === 'end') crossOffset = containerCross - totalCross;

        for (const line of lineMetrics) {
            const positions = this._justifyLine(line.items, mainSize, line.totalMain, containerMain, mainGap);

            for (let i = 0; i < line.items.length; i++) {
                const item = line.items[i];
                const itemCross = crossSize(item);
                const itemCrossOffset = (line.maxCross - itemCross) / 2;

                item[mainAxis] = positions[i];
                item[crossAxis] = crossOffset + itemCrossOffset;
            }

            crossOffset += line.maxCross + crossGap;
        }
    }

    _buildLines(items, mainSize, containerMain, mainGap) {
        if (!this.wrap || containerMain <= 0) return [items];

        const lines = [];
        let currentLine = [];
        let lineSize = 0;

        for (const item of items) {
            const size = mainSize(item);
            const needed = currentLine.length > 0 ? size + mainGap : size;

            if (lineSize + needed > containerMain && currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [item];
                lineSize = size;
            } else {
                currentLine.push(item);
                lineSize += needed;
            }
        }

        if (currentLine.length > 0) lines.push(currentLine);
        return lines;
    }

    _justifyLine(items, mainSize, totalMain, containerMain, mainGap) {
        const count = items.length;
        const gapSpace = (count - 1) * mainGap;
        const contentSize = totalMain + gapSpace;

        let offset = 0;
        let gap = mainGap;

        switch (this.justify) {
            case 'center':
                offset = containerMain > 0 ? (containerMain - contentSize) / 2 : 0;
                break;
            case 'end':
                offset = containerMain > 0 ? containerMain - contentSize : 0;
                break;
            case 'between':
                if (count > 1 && containerMain > 0) {
                    gap = (containerMain - totalMain) / (count - 1);
                }
                break;
            case 'around':
                if (containerMain > 0) {
                    gap = (containerMain - totalMain) / (count + 1);
                    offset = gap;
                }
                break;
        }

        const positions = [];
        let pos = offset;
        for (const item of items) {
            const size = mainSize(item);
            positions.push(pos + size / 2);
            pos += size + gap;
        }

        return positions;
    }
}
