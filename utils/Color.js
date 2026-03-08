export class Color {
    static fromRGBA(rgba) {
        const match = rgba.match(/rgba?\(([^)]+)\)/);
        if (!match) return { color: 0xffffff, alpha: 1 };

        const parts = match[1].split(',').map(part => parseFloat(part.trim()));
        const [r, g, b, a = 1] = parts;

        const color = (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b);
        const alpha = Math.min(1, Math.max(0, a));

        return { color, alpha };
    }

    static toRGBA(color, alpha = 1) {
        const r = (color >> 16) & 0xff;
        const g = (color >> 8) & 0xff;
        const b = color & 0xff;
        return `rgba(${r},${g},${b},${alpha})`;
    }

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

    static fromValues(r, g, b, a = 1) {
        const clamp = (v) => Math.max(0, Math.min(1, v));
        const red = Math.round(clamp(r) * 255);
        const green = Math.round(clamp(g) * 255);
        const blue = Math.round(clamp(b) * 255);
        return { color: (red << 16) + (green << 8) + blue, alpha: clamp(a) };
    }

    static fromArray(color) {
        return Color.fromValues(color[0] / 255, color[1] / 255, color[2] / 255, color[3] ?? 1);
    }
}
