import { Component } from '../core/Component.js';
import { ButtonStyle } from './ButtonStyle.js';

/**
 * Interactive button with label, hover feedback and configurable style.
 *
 * Emits {@link Button.EVENT_TAP} on click/tap. Visual appearance is
 * controlled by a {@link ButtonStyle} data object.
 *
 * @example
 * const btn = new Button('Confirm', 200, 48);
 * btn.on(Button.EVENT_TAP, () => console.log('clicked'));
 * stage.addChild(btn);
 */
export class Button extends Component {
    /** Event name emitted on tap/click. */
    static EVENT_TAP = 'tap';

    /**
     * @param {string} [label=''] - Button text.
     * @param {number} [width=160] - Button width in pixels.
     * @param {number} [height=40] - Button height in pixels.
     * @param {ButtonStyle} [style] - Visual style configuration.
     */
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

    /**
     * Change the button label text.
     * @param {string} text
     */
    setLabel(text) {
        this.label.text = text;
    }

    /**
     * Enable or disable interaction.
     * @param {boolean} enabled
     */
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
