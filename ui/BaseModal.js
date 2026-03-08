import { Button } from './Button.js';
import { ButtonStyle } from './ButtonStyle.js';
import { FlowLayout } from './FlowLayout.js';

const OVERLAY_SIZE = 4000;

export class BaseModal extends PIXI.Container {
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

    _buildContentBox() {
        this.contentBox = new PIXI.Container();
        this.contentBox.interactive = true;
        this.contentBox.on('pointertap', (e) => e.stopPropagation());
        this.addChild(this.contentBox);
    }

    _buildButtonBar({ gap = 20 } = {}) {
        this.buttonBar = new FlowLayout({ gap });
        return this.buttonBar;
    }

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

    _centerOnScreen(boxW, boxH) {
        const worldScale = this._world.scale.x;
        const worldX = this._world.x;
        const worldY = this._world.y;
        this.contentBox.x = worldX + ((this._logicalWidth - (boxW || this.boxWidth)) / 2) * worldScale;
        this.contentBox.y = worldY + ((this._logicalHeight - (boxH || this.boxHeight)) / 2) * worldScale;
        this.contentBox.scale.set(worldScale);
    }

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
