import { Button } from './Button.js';
import { ButtonStyle } from './ButtonStyle.js';
import { FlowLayout } from './FlowLayout.js';

const OVERLAY_SIZE = 4000;

/**
 * Base class for modal dialogs.
 *
 * Provides overlay, content box, separator line, and a button bar
 * powered by {@link FlowLayout} and {@link Button}. Subclass and
 * compose your own content inside `contentBox`.
 *
 * @example
 * class ConfirmModal extends BaseModal {
 *     build() {
 *         this._buildOverlay({ dismissOnClick: true });
 *         this._buildContentBox();
 *         const bar = this._buildButtonBar();
 *         this._createButton('OK', () => this.hide());
 *         this._createButton('Cancel', () => this.hide());
 *         this.contentBox.addChild(bar);
 *         this._centerOnScreen();
 *     }
 * }
 */
export class BaseModal extends PIXI.Container {
    /**
     * @param {*} assets - Shared asset registry.
     * @param {PIXI.Container} world - The root world container (used for scale/position).
     * @param {Object} [options]
     * @param {number} [options.boxWidth=500]
     * @param {number} [options.boxHeight=480]
     * @param {number} [options.pad=24]
     * @param {number} [options.logicalWidth=1600]
     * @param {number} [options.logicalHeight=900]
     * @param {ButtonStyle} [options.buttonStyle]
     * @param {number} [options.separatorColor=0x7a4a3a]
     * @param {number} [options.separatorAlpha=0.3]
     */
    constructor(assets, world, {
        boxWidth = 500,
        boxHeight = 480,
        pad = 24,
        logicalWidth = 1600,
        logicalHeight = 900,
        buttonStyle = new ButtonStyle(),
        separatorColor = 0x7a4a3a,
        separatorAlpha = 0.3,
    } = {}) {
        super();
        this.visible = false;
        this._assets = assets;
        this._world = world;
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
        this.pad = pad;
        this._logicalWidth = logicalWidth;
        this._logicalHeight = logicalHeight;
        this._buttonStyle = buttonStyle;
        this._separatorColor = separatorColor;
        this._separatorAlpha = separatorAlpha;
    }

    /**
     * Create a semi-transparent overlay behind the modal.
     * @param {Object} [options]
     * @param {number} [options.opacity=0.35]
     * @param {boolean} [options.dismissOnClick=false] - Hide the modal when clicking the overlay.
     */
    _buildOverlay({ opacity = 0.35, dismissOnClick = false } = {}) {
        this.overlay = new PIXI.Graphics();
        this.overlay.rect(0, 0, OVERLAY_SIZE, OVERLAY_SIZE).fill({ color: 0x000000, alpha: opacity });
        this.overlay.interactive = true;
        this.overlay.cursor = 'default';
        if (dismissOnClick) {
            this.overlay.on('pointertap', () => this.hide());
        }
        this.addChild(this.overlay);
    }

    /**
     * Create the content container (blocks click-through to overlay).
     */
    _buildContentBox() {
        this.contentBox = new PIXI.Container();
        this.contentBox.interactive = true;
        this.contentBox.on('pointertap', (e) => e.stopPropagation());
        this.addChild(this.contentBox);
    }

    /**
     * Create a {@link FlowLayout} for the button bar.
     * @param {Object} [options]
     * @param {number} [options.gap=20]
     * @returns {FlowLayout}
     */
    _buildButtonBar({ gap = 20 } = {}) {
        this.buttonBar = new FlowLayout({ gap });
        return this.buttonBar;
    }

    /**
     * Create a {@link Button} and add it to the button bar.
     * @param {string} label
     * @param {function} onClick
     * @param {Object} [options]
     * @param {number} [options.width=160]
     * @param {number} [options.height=40]
     * @returns {Button}
     */
    _createButton(label, onClick, { width = 160, height = 40 } = {}) {
        const button = new Button(label, width, height, this._buttonStyle);
        button.on(Button.EVENT_TAP, onClick);
        button.show();
        if (this.buttonBar) {
            this.buttonBar.addChild(button);
            this.buttonBar.layout();
        }
        return button;
    }

    /**
     * Center the content box on screen, accounting for world scale.
     * @param {number} [boxW] - Override width (defaults to `this.boxWidth`).
     * @param {number} [boxH] - Override height (defaults to `this.boxHeight`).
     */
    _centerOnScreen(boxW, boxH) {
        const worldScale = this._world.scale.x;
        const worldX = this._world.x;
        const worldY = this._world.y;
        this.contentBox.x = worldX + ((this._logicalWidth - (boxW || this.boxWidth)) / 2) * worldScale;
        this.contentBox.y = worldY + ((this._logicalHeight - (boxH || this.boxHeight)) / 2) * worldScale;
        this.contentBox.scale.set(worldScale);
    }

    /**
     * Draw a horizontal separator line.
     * @param {number} y - Vertical position.
     * @param {number} width - Line width.
     * @returns {PIXI.Graphics}
     */
    _drawSeparator(y, width) {
        const line = new PIXI.Graphics();
        line.moveTo(0, y);
        line.lineTo(width, y);
        line.stroke({ width: 1.5, color: this._separatorColor, alpha: this._separatorAlpha });
        return line;
    }

    hide() {
        this.visible = false;
    }
}
