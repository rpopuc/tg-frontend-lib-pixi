export class Draggable {
    constructor(target, { onStart, onMove, onEnd, deadZone = 0 } = {}) {
        this.target = target;
        this.onStart = onStart || null;
        this.onMove = onMove || null;
        this.onEnd = onEnd || null;
        this.deadZone = deadZone;
        this.dragging = false;
        this._dragStarted = false;
        this._startGlobal = { x: 0, y: 0 };
        this._offset = { x: 0, y: 0 };

        this._onPointerDown = this._onPointerDown.bind(this);
        this._onPointerMove = this._onPointerMove.bind(this);
        this._onPointerUp = this._onPointerUp.bind(this);

        this.target.eventMode = 'static';
        this.target.cursor = 'pointer';
        this.target.on('pointerdown', this._onPointerDown);
    }

    _onPointerDown(event) {
        this.dragging = true;
        this._dragStarted = false;

        const pos = this.target.parent.toLocal({ x: event.clientX, y: event.clientY });
        this._offset.x = this.target.x - pos.x;
        this._offset.y = this.target.y - pos.y;
        this._startGlobal.x = event.clientX;
        this._startGlobal.y = event.clientY;

        window.addEventListener('pointermove', this._onPointerMove);
        window.addEventListener('pointerup', this._onPointerUp);
    }

    _onPointerMove(event) {
        if (!this.dragging) return;

        if (!this._dragStarted) {
            const dx = event.clientX - this._startGlobal.x;
            const dy = event.clientY - this._startGlobal.y;
            if (Math.sqrt(dx * dx + dy * dy) < this.deadZone) return;
            this._dragStarted = true;
            if (this.onStart) this.onStart({ x: this.target.x, y: this.target.y });
        }

        const pos = this.target.parent.toLocal({ x: event.clientX, y: event.clientY });
        this.target.x = pos.x + this._offset.x;
        this.target.y = pos.y + this._offset.y;

        if (this.onMove) this.onMove({ x: this.target.x, y: this.target.y });
    }

    _onPointerUp() {
        if (!this.dragging) return;
        this.dragging = false;

        window.removeEventListener('pointermove', this._onPointerMove);
        window.removeEventListener('pointerup', this._onPointerUp);

        if (this._dragStarted && this.onEnd) {
            this.onEnd({ x: this.target.x, y: this.target.y });
        }
    }

    destroy() {
        this.target.off('pointerdown', this._onPointerDown);
        window.removeEventListener('pointermove', this._onPointerMove);
        window.removeEventListener('pointerup', this._onPointerUp);
    }
}
