export class LayoutManager {
    constructor(app, world, { logicalWidth = 1600, logicalHeight = 900 } = {}) {
        this.app = app;
        this.world = world;
        this.logicalWidth = logicalWidth;
        this.logicalHeight = logicalHeight;

        window.addEventListener('resize', () => this.resize());
    }

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
