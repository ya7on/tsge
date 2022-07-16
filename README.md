# ts-game-engine

## Init

```html
<html>
<head>
    <title>Example</title>
</head>
<body>
<canvas id="canvas"><!-- YOUR CANVAS ELEMENT --></canvas>
</body>
</html>
```

```typescript
import {Engine} from "./lib";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const engine = new Engine(canvas);
```

## Playable object

```typescript
import {BaseGameObject} from "./base";

class PlayableObject extends BaseGameObject {
    onRender(): void {
        //
    }

    onStep(keyboard: KeyProperties): void {
        if (keyboard.KeyD.pressed) {
            this.position.x += 1;
        }
        if (keyboard.KeyA.pressed) {
            this.position.x -= 1;
        }
        if (keyboard.KeyW.pressed) {
            this.position.y -= 1;
        }
        if (keyboard.KeyS.pressed) {
            this.position.y += 1;
        }
    }
}
```
