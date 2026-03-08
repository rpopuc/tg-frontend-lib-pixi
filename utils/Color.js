/**
 * Color conversion utilities for PixiJS.
 *
 * All methods return `{ color: number, alpha: number }` where `color`
 * is a 24-bit integer (0xRRGGBB) and `alpha` is 0..1.
 *
 * @example
 * const { color, alpha } = Color.fromHex('#FF000080');
 * graphics.beginFill(color, alpha);
 */
export class Color {
    /**
     * Parse a CSS `rgba(r, g, b, a)` or `rgb(r, g, b)` string.
     * @param {string} rgba
     * @returns {{color: number, alpha: number}}
     */
    static fromRGBA(rgba) {
        const match = rgba.match(/rgba?\(([^)]+)\)/);
        if (!match) return { color: 0xffffff, alpha: 1 };

        const parts = match[1].split(',').map(part => parseFloat(part.trim()));
        const [r, g, b, a = 1] = parts;

        const color = (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b);
        const alpha = Math.min(1, Math.max(0, a));

        return { color, alpha };
    }

    /**
     * Convert a 24-bit color integer to a CSS `rgba()` string.
     * @param {number} color
     * @param {number} [alpha=1]
     * @returns {string}
     */
    static toRGBA(color, alpha = 1) {
        const r = (color >> 16) & 0xff;
        const g = (color >> 8) & 0xff;
        const b = color & 0xff;
        return `rgba(${r},${g},${b},${alpha})`;
    }

    /**
     * Parse a hex color string (`#RGB`, `#RRGGBB`, `#RRGGBBAA`) or number.
     * @param {string|number} input
     * @returns {{color: number, alpha: number}}
     */
    static fromHex(input) {
        let hex = input;

        if (typeof hex === 'string') {
            hex = hex.trim().toLowerCase();
            if (hex.startsWith('#')) hex = hex.slice(1);
            if (hex.startsWith('0x')) hex = hex.slice(2);

            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
            }

            if (hex.length === 6) {
                return { color: parseInt(hex, 16), alpha: 1 };
            }

            if (hex.length === 8) {
                const color = parseInt(hex.slice(0, 6), 16);
                const alpha = parseInt(hex.slice(6, 8), 16) / 255;
                return { color, alpha };
            }

            return { color: 0xffffff, alpha: 1 };
        }

        if (typeof hex === 'number') {
            return { color: hex & 0xffffff, alpha: 1 };
        }

        return { color: 0xffffff, alpha: 1 };
    }

    /**
     * Create a color from float components (0..1 each).
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} [a=1]
     * @returns {{color: number, alpha: number}}
     */
    static fromValues(r, g, b, a = 1) {
        const clamp = (v) => Math.max(0, Math.min(1, v));
        const red = Math.round(clamp(r) * 255);
        const green = Math.round(clamp(g) * 255);
        const blue = Math.round(clamp(b) * 255);
        return { color: (red << 16) + (green << 8) + blue, alpha: clamp(a) };
    }

    /**
     * Create a color from a `[r, g, b, a?]` array (0..255 for RGB, 0..1 for alpha).
     * @param {number[]} color
     * @returns {{color: number, alpha: number}}
     */
    static fromArray(color) {
        return Color.fromValues(color[0] / 255, color[1] / 255, color[2] / 255, color[3] ?? 1);
    }
}
