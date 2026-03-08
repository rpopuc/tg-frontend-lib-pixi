# @tabula-games/frontend-lib

Reusable PixiJS components for Tabula Games frontends.

## Install

```bash
npm install @tabula-games/frontend-lib
```

Requires `pixi.js >= 7.0.0` as peer dependency.

## Components

### Core

- **AnimationBus** — Sequential/parallel animation orchestrator. Queue async functions and play them in order or concurrently.
- **Component** — Base class extending `PIXI.Container` with data/state management, init/update lifecycle, and child cleanup.
- **LayoutManager** — Responsive canvas scaling that maintains aspect ratio and centers the world on resize.

### UI

- **Button** — Interactive button with label, hover feedback, and configurable style via `ButtonStyle`.
- **ButtonStyle** — Style data object for Button (colors, border, font, radius).
- **FlowLayout** — Positions visible children in a row or column with gap and cross-axis alignment.
- **BaseModal** — Base class for modal dialogs with overlay, content centering, separator, and button bar (uses `FlowLayout` + `Button` internally).

## Usage

```js
import { AnimationBus, Component, Button, ButtonStyle, FlowLayout } from '@tabula-games/frontend-lib';

// Button with custom style
const style = new ButtonStyle({ bgColor: 0xC8A96E, textColor: 0x3a2415 });
const btn = new Button('Confirm', 200, 48, style);
btn.on(Button.EVENT_TAP, () => console.log('clicked'));

// Flow layout
const bar = new FlowLayout({ gap: 16, direction: 'horizontal', align: 'center' });
bar.addChild(btn);
bar.layout();

// Animation bus
const bus = new AnimationBus();
bus.addParallel(() => fadeIn(sprite1));
bus.addParallel(() => fadeIn(sprite2));
bus.addSequential(() => slideUp(title));
await bus.play();
```

## Tests

```bash
npm test
```
