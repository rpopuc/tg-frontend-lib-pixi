/**
 * Responsive canvas scaling that maintains aspect ratio.
 *
 * Scales a world container to fit the browser window while preserving
 * the logical resolution, and centers it on resize.
 *
 * @example
 * const app = new PIXI.Application({ resizeTo: window });
 * const world = new PIXI.Container();
 * app.stage.addChild(world);
 * const layout = new LayoutManager(app, world, { logicalWidth: 1920, logicalHeight: 1080 });
 * layout.resize();
 */
export class LayoutManager {
    /**
     * @param {PIXI.Application} app - The PixiJS application instance.
     * @param {PIXI.Container} world - The root container to scale.
     * @param {Object} [options]
     * @param {number} [options.logicalWidth=1600] - Design width in logical pixels.
     * @param {number} [options.logicalHeight=900] - Design height in logical pixels.
     */
    constructor(app, world, { logicalWidth = 1600, logicalHeight = 900 } = {}) {
        this.app = app;
        this.world = world;
        this.logicalWidth = logicalWidth;
        this.logicalHeight = logicalHeight;

        window.addEventListener('resize', () => this.resize());
    }

    /**
     * Recalculate scale and position to fit the current window size.
     */
    resize() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scaleX = screenWidth / this.logicalWidth;
        const scaleY = screenHeight / this.logicalHeight;
        const scale = Math.min(scaleX, scaleY);

        this.world.scale.set(scale);
        this.world.x = (screenWidth - this.logicalWidth * scale) / 2;
        this.world.y = (screenHeight - this.logicalHeight * scale) / 2;

        this.app.renderer.resize(screenWidth, screenHeight);
    }
}
