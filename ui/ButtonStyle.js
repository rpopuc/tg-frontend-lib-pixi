export class ButtonStyle {
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
