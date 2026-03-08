/**
 * Style data object for {@link Button}.
 *
 * @example
 * const style = new ButtonStyle({
 *     bgColor: 0xC8A96E,
 *     textColor: 0x3a2415,
 *     radius: 12,
 * });
 * const btn = new Button('OK', 160, 40, style);
 */
export class ButtonStyle {
    /**
     * @param {Object} [options]
     * @param {number} [options.bgColor=0x666666]
     * @param {number} [options.bgHoverColor=0x888888]
     * @param {number} [options.borderColor=0x444444]
     * @param {number} [options.borderWidth=2]
     * @param {number} [options.radius=8]
     * @param {number} [options.textColor=0xffffff]
     * @param {string} [options.fontFamily='sans-serif']
     * @param {number} [options.fontSize=16]
     */
    constructor({
        bgColor = 0x666666,
        bgHoverColor = 0x888888,
        borderColor = 0x444444,
        borderWidth = 2,
        radius = 8,
        textColor = 0xffffff,
        fontFamily = 'sans-serif',
        fontSize = 16,
    } = {}) {
        this.bgColor = bgColor;
        this.bgHoverColor = bgHoverColor;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
        this.radius = radius;
        this.textColor = textColor;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
    }
}
