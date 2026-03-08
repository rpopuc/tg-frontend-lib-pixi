/**
 * Standard easing functions for animations.
 *
 * Each function takes a progress value `t` (0..1) and returns the
 * eased value. Use with `MathUtils.lerp()` or any tween system.
 *
 * @example
 * const t = elapsed / duration;
 * sprite.alpha = MathUtils.lerp(0, 1, Easing.easeOutCubic(t));
 */
export class Easing {
    /** @param {number} t - Progress 0..1 @returns {number} */
    static linear(t) {
        return t;
    }

    /** @param {number} t @returns {number} */
    static easeInQuad(t) {
        return t * t;
    }

    /** @param {number} t @returns {number} */
    static easeOutQuad(t) {
        return t * (2 - t);
    }

    /** @param {number} t @returns {number} */
    static easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    /** @param {number} t @returns {number} */
    static easeInCubic(t) {
        return t * t * t;
    }

    /** @param {number} t @returns {number} */
    static easeOutCubic(t) {
        return (--t) * t * t + 1;
    }

    /** @param {number} t @returns {number} */
    static easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    /** @param {number} t @returns {number} */
    static easeInSine(t) {
        return 1 - Math.cos((t * Math.PI) / 2);
    }

    /** @param {number} t @returns {number} */
    static easeOutSine(t) {
        return Math.sin((t * Math.PI) / 2);
    }

    /** @param {number} t @returns {number} */
    static easeInOutSine(t) {
        return -(Math.cos(Math.PI * t) - 1) / 2;
    }

    /** @param {number} t @returns {number} */
    static easeOutBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    /** @param {number} t @returns {number} */
    static easeOutBounce(t) {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
}
