import engine from "../src/lib";
import {KeyProperties} from "../src/keyboardEmitter";

class Player extends engine.BaseGameObject {
    onRender(): void {
        //
    }

    onStep(keyboard: KeyProperties): void {
        if (keyboard.KeyD.pressed) {
            this.position.x += 0.1;
        }
        if (keyboard.KeyA.pressed) {
            this.position.x -= 0.1;
        }
        if (keyboard.KeyW.pressed) {
            this.position.y -= 0.1;
        }
        if (keyboard.KeyS.pressed) {
            this.position.y += 0.1;
        }
    }

}

document.addEventListener("DOMContentLoaded", function(_) {
    const e = new engine.Engine(<HTMLCanvasElement>document.getElementById("canvas"));
    const p = new Player({});
    e.register(p);
});
