/**
 * Common math utilities for game frontends.
 *
 * @example
 * const pos = MathUtils.lerpPosition(from, to, 0.5);
 * const clamped = MathUtils.clamp(value, 0, 100);
 */
export class MathUtils {
    /**
     * Linear interpolation between two values.
     * @param {number} a - Start value.
     * @param {number} b - End value.
     * @param {number} t - Progress 0..1.
     * @returns {number}
     */
    static lerp(a, b, t) {
        return a + (b - a) * t;
    }

    /**
     * Linear interpolation between two `{x, y}` points.
     * @param {{x: number, y: number}} from
     * @param {{x: number, y: number}} to
     * @param {number} t - Progress 0..1.
     * @returns {{x: number, y: number}}
     */
    static lerpPosition(from, to, t) {
        return {
            x: MathUtils.lerp(from.x, to.x, t),
            y: MathUtils.lerp(from.y, to.y, t),
        };
    }

    /**
     * Linear interpolation between two `[r, g, b, a]` color arrays.
     * @param {number[]} from
     * @param {number[]} to
     * @param {number} t - Progress 0..1.
     * @returns {number[]}
     */
    static lerpColor(from, to, t) {
        return [
            Math.trunc(MathUtils.lerp(from[0], to[0], t)),
            Math.trunc(MathUtils.lerp(from[1], to[1], t)),
            Math.trunc(MathUtils.lerp(from[2], to[2], t)),
            MathUtils.lerp(from[3], to[3], t),
        ];
    }

    /**
     * Clamp a value between min and max.
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    /**
     * Normalize a value from the range [min, max] to [0, 1].
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    static normalize(value, min, max) {
        return (value - min) / (max - min);
    }

    /**
     * Map a value from one range to another.
     * @param {number} value
     * @param {number} inMin
     * @param {number} inMax
     * @param {number} outMin
     * @param {number} outMax
     * @returns {number}
     */
    static map(value, inMin, inMax, outMin, outMax) {
        return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
    }

    /**
     * Euclidean distance between two points.
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @returns {number}
     */
    static distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    /**
     * Round to a specific number of decimal places.
     * @param {number} value
     * @param {number} [decimals=0]
     * @returns {number}
     */
    static roundTo(value, decimals = 0) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }

    /**
     * Random integer in range [from, to).
     * @param {number} to - Exclusive upper bound.
     * @param {number} [from=0] - Inclusive lower bound.
     * @returns {number}
     */
    static random(to, from = 0) {
        return Math.floor(Math.random() * (to - from)) + from;
    }

    /**
     * Cycle an index forward within a range [0, max).
     * @param {number} current
     * @param {number} max
     * @returns {number}
     */
    static cycle(current, max) {
        return (current + 1) % max;
    }
}
