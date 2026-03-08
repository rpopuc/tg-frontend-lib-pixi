/**
 * Calculates letterbox dimensions for a target aspect ratio.
 *
 * Given the current viewport size, computes the largest rectangle
 * that fits within the window while preserving the desired ratio,
 * and provides the x/y offset to center it.
 *
 * @example
 * const constraints = new ScreenConstraints(16, 9);
 * window.addEventListener('resize', () => constraints.update());
 * const { x, y, width, height } = constraints.getDimensions();
 */
export class ScreenConstraints {
    /**
     * @param {number} [aspectWidth=16] - Horizontal component of the aspect ratio.
     * @param {number} [aspectHeight=9] - Vertical component of the aspect ratio.
     */
    constructor(aspectWidth = 16, aspectHeight = 9) {
        this.aspectWidth = aspectWidth;
        this.aspectHeight = aspectHeight;

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.update();
    }

    /**
     * Recalculate dimensions based on the current viewport size.
     */
    update() {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const targetRatio = this.aspectWidth / this.aspectHeight;
        const screenRatio = screenW / screenH;

        if (screenRatio > targetRatio) {
            this.height = screenH;
            this.width = screenH * targetRatio;
        } else {
            this.width = screenW;
            this.height = screenW / targetRatio;
        }

        this.x = (screenW - this.width) / 2;
        this.y = (screenH - this.height) / 2;
    }

    /**
     * @returns {{x: number, y: number, width: number, height: number}}
     */
    getDimensions() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }
}
