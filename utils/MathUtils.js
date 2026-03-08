export class MathUtils {
    static lerp(a, b, t) {
        return a + (b - a) * t;
    }

    static lerpPosition(from, to, t) {
        return {
            x: MathUtils.lerp(from.x, to.x, t),
            y: MathUtils.lerp(from.y, to.y, t),
        };
    }

    static lerpColor(from, to, t) {
        return [
            Math.trunc(MathUtils.lerp(from[0], to[0], t)),
            Math.trunc(MathUtils.lerp(from[1], to[1], t)),
            Math.trunc(MathUtils.lerp(from[2], to[2], t)),
            MathUtils.lerp(from[3], to[3], t),
        ];
    }

    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    static normalize(value, min, max) {
        return (value - min) / (max - min);
    }

    static map(value, inMin, inMax, outMin, outMax) {
        return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
    }

    static distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    static roundTo(value, decimals = 0) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }

    static random(to, from = 0) {
        return Math.floor(Math.random() * (to - from)) + from;
    }

    static cycle(current, max) {
        return (current + 1) % max;
    }
}
