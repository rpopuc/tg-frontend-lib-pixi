import { Component } from '../core/Component.js';
import { ButtonStyle } from './ButtonStyle.js';

export class Button extends Component {
    static EVENT_TAP = 'tap';

    constructor(label = '', width = 160, height = 40, style = new ButtonStyle()) {
        super(null);
        this.interactive = true;
        this.cursor = 'pointer';

        this.btnWidth = width;
        this.btnHeight = height;
        this.style = style;

        this.bg = new PIXI.Graphics();
        this.addChild(this.bg);

        this.label = new PIXI.Text(label, {
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fill: style.textColor,
            fontWeight: 'bold',
        });
        this.label.anchor.set(0.5);
        this.addChild(this.label);

        this._drawBg(style.bgColor);

        this.on('pointerover', () => this._drawBg(this.style.bgHoverColor));
        this.on('pointerout', () => this._drawBg(this.style.bgColor));
        this.on('pointertap', () => this.emit(Button.EVENT_TAP));
    }

    _drawBg(color) {
        this.bg.clear();
        this.bg.lineStyle(this.style.borderWidth, this.style.borderColor, 1);
        this.bg.beginFill(color);
        this.bg.drawRoundedRect(
            -this.btnWidth / 2,
            -this.btnHeight / 2,
            this.btnWidth,
            this.btnHeight,
            this.style.radius,
        );
        this.bg.endFill();
    }

    setLabel(text) {
        this.label.text = text;
    }

    setEnabled(enabled) {
        this.interactive = enabled;
        this.cursor = enabled ? 'pointer' : 'default';
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}
