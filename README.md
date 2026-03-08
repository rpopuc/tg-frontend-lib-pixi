# @rpopuc/tg-frontend-lib-pixi

Reusable PixiJS components for game frontends. Provides UI primitives,
layout management, asset pipeline, drag interaction, animation
orchestration and math/color utilities.

## Install

```bash
npm install @rpopuc/tg-frontend-lib-pixi
```

Requires `pixi.js >= 7.0.0` as peer dependency.

## Core

### Component

Base class for all PixiJS components. Extends `PIXI.Container` with a
data/state lifecycle (`init` / `update` / `draw`).

```js
import { Component } from '@rpopuc/tg-frontend-lib-pixi';

class ScoreDisplay extends Component {
    draw() {
        this.destroyChildren();
        const text = new PIXI.Text(`Score: ${this.data.score}`);
        this.addChild(text);
    }
}

const display = new ScoreDisplay().init({ score: 0 });
display.update({ score: 42 });     // triggers draw()
display.setState({ highlight: true }); // merges state, triggers draw()
```

### AnimationBus

Sequential and parallel animation orchestrator. Queue async functions
and play them in order or concurrently.

```js
import { AnimationBus } from '@rpopuc/tg-frontend-lib-pixi';

const bus = new AnimationBus();
bus.addParallel(() => fadeIn(sprite1));
bus.addParallel(() => fadeIn(sprite2));
bus.addSequential(() => slideUp(title));
await bus.play();
```

### LayoutManager

Responsive canvas scaling that maintains a logical resolution and
centers the world container on window resize.

```js
import { LayoutManager } from '@rpopuc/tg-frontend-lib-pixi';

const layout = new LayoutManager(app, world, {
    logicalWidth: 1920,
    logicalHeight: 1080,
});
layout.resize();
```

### ScreenConstraints

Calculates letterbox dimensions for a target aspect ratio.

```js
import { ScreenConstraints } from '@rpopuc/tg-frontend-lib-pixi';

const constraints = new ScreenConstraints(16, 9);
window.addEventListener('resize', () => constraints.update());
const { x, y, width, height } = constraints.getDimensions();
```

## UI

### Button + ButtonStyle

Interactive button with hover feedback and configurable style.

```js
import { Button, ButtonStyle } from '@rpopuc/tg-frontend-lib-pixi';

const style = new ButtonStyle({
    bgColor: 0xC8A96E,
    bgHoverColor: 0xD4B87A,
    textColor: 0x3a2415,
    radius: 12,
});
const btn = new Button('Confirm', 200, 48, style);
btn.on(Button.EVENT_TAP, () => console.log('clicked'));
btn.setEnabled(false); // disable interaction
```

### FlowLayout

Flexbox-like layout for positioning children in rows or columns.

```js
import { FlowLayout } from '@rpopuc/tg-frontend-lib-pixi';

const bar = new FlowLayout({
    gap: 16,                    // or { x: 16, y: 8 }
    direction: 'horizontal',    // or 'vertical'
    justify: 'center',          // start | center | end | between | around
    align: 'center',            // start | center | end
    wrap: true,                 // wrap to next line
    width: 800,                 // required for justify/wrap
});
bar.addChild(btn1);
bar.addChild(btn2);
bar.layout();
```

### BaseModal

Base class for modal dialogs with overlay, content centering and button bar.

```js
import { BaseModal, ButtonStyle } from '@rpopuc/tg-frontend-lib-pixi';

class ConfirmModal extends BaseModal {
    build() {
        this._buildOverlay({ opacity: 0.5, dismissOnClick: true });
        this._buildContentBox();
        const bar = this._buildButtonBar({ gap: 16 });
        this._createButton('OK', () => this.onConfirm());
        this._createButton('Cancel', () => this.hide());
        this.contentBox.addChild(bar);
        this._centerOnScreen();
        this.visible = true;
    }
}
```

## Assets

### ImageManager

Loads and caches textures via `PIXI.Assets`.

```js
import { ImageManager } from '@rpopuc/tg-frontend-lib-pixi';

const images = new ImageManager();
await images.load('hero', '/sprites/hero.png');
await images.load('bg', '/sprites/background.png');
await images.whenReady();

const texture = images.get('hero');
images.has('hero');   // true
images.unload('hero');
images.clear();
```

### FontManager + Font

Loads web fonts and provides `PIXI.TextStyle` wrappers with measurement.

```js
import { FontManager } from '@rpopuc/tg-frontend-lib-pixi';

const fonts = new FontManager();
await fonts.load('title', {
    url: '/fonts/Title.woff2',
    fontFamily: 'TitleFont',
    size: 32,
});
await fonts.load('body', { fontFamily: 'Arial', size: 16, fill: 0xffffff });

const titleFont = fonts.get('title');
const width = titleFont.getWidth('Hello World');
const height = titleFont.getHeight();
const redStyle = titleFont.getStyle({ fill: 0xff0000 });
```

### SpriteSheetManager + SpriteSheet

Grid-based sprite sheet loading and frame access.

```js
import { SpriteSheetManager } from '@rpopuc/tg-frontend-lib-pixi';

const sheets = new SpriteSheetManager();
sheets.load('dice', { image: diceTexture, columns: 6, rows: 1 });
sheets.load('cards', { image: cardsTexture, columns: 13, rows: 4 });
await sheets.whenReady();

const diceSheet = sheets.get('dice');
const frame = diceSheet.getFrameTexture(3);
const sprite = new PIXI.Sprite(frame);
```

## Interaction

### Draggable / makeDraggable

Adds drag behavior to any `PIXI.Container` with dead zone support.

```js
import { makeDraggable } from '@rpopuc/tg-frontend-lib-pixi';

const handle = makeDraggable(sprite, {
    deadZone: 10,
    onStart: (pos) => console.log('started', pos),
    onMove: (pos) => console.log('moving', pos),
    onEnd: (pos) => console.log('dropped', pos),
});

// cleanup
handle.destroy();
```

## Utils

### Color

Color conversion between hex strings, RGBA, float values and PixiJS format.

```js
import { Color } from '@rpopuc/tg-frontend-lib-pixi';

Color.fromHex('#FF000080');          // { color: 0xFF0000, alpha: 0.5 }
Color.fromRGBA('rgba(255,0,0,0.5)'); // { color: 0xFF0000, alpha: 0.5 }
Color.fromValues(1, 0, 0, 0.5);     // { color: 0xFF0000, alpha: 0.5 }
Color.fromArray([255, 0, 0, 0.5]);   // { color: 0xFF0000, alpha: 0.5 }
Color.toRGBA(0xFF0000, 0.5);        // 'rgba(255,0,0,0.5)'
```

### Easing

Standard easing functions (12 curves). All take `t` (0..1) and return the eased value.

```js
import { Easing, MathUtils } from '@rpopuc/tg-frontend-lib-pixi';

const t = elapsed / duration;
sprite.alpha = MathUtils.lerp(0, 1, Easing.easeOutCubic(t));
```

Available: `linear`, `easeInQuad`, `easeOutQuad`, `easeInOutQuad`,
`easeInCubic`, `easeOutCubic`, `easeInOutCubic`, `easeInSine`,
`easeOutSine`, `easeInOutSine`, `easeOutBack`, `easeOutBounce`.

### MathUtils

Common math operations for game development.

```js
import { MathUtils } from '@rpopuc/tg-frontend-lib-pixi';

MathUtils.lerp(0, 100, 0.5);            // 50
MathUtils.lerpPosition(a, b, 0.5);      // { x, y }
MathUtils.lerpColor([255,0,0,1], [0,0,255,1], 0.5);
MathUtils.clamp(150, 0, 100);           // 100
MathUtils.normalize(50, 0, 100);        // 0.5
MathUtils.map(5, 0, 10, 0, 100);        // 50
MathUtils.distance(0, 0, 3, 4);         // 5
MathUtils.roundTo(3.14159, 2);           // 3.14
MathUtils.random(10);                    // 0..9
MathUtils.cycle(2, 5);                   // 3
```

### EventEmitter

Minimal event emitter for decoupled communication.

```js
import { EventEmitter } from '@rpopuc/tg-frontend-lib-pixi';

const emitter = new EventEmitter();
emitter.on('score', ({ value }) => console.log(value));
emitter.trigger('score', { value: 42 });
emitter.has('score');    // true
emitter.remove('score', callback);
emitter.clear('score');
```

## Tests

```bash
npm test
```

## License

MIT
