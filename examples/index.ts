import engine from "../src/lib";
import {KeyProperties} from "../src/keyboardEmitter";
import {BaseGameObject} from "../src/objects/base";
import {PlayableObject} from "../src/objects/playableObject";

class Player extends PlayableObject {
    onRender(): void {
        //
    }

    onStep(keyboard: KeyProperties): void {
        //
    }

}

class OtherObject extends BaseGameObject {
    onRender(): void {
    }

    onStep(keyboard: KeyProperties): void {
    }

}

document.addEventListener("DOMContentLoaded", function(_) {
    const e = new engine.Engine(<HTMLCanvasElement>document.getElementById("canvas"));
    const p = new Player({});
    e.register(p);
    // const o = new OtherObject({
    //     position: {
    //         x: 50,
    //         y: 10,
    //     }
    // });
    // e.register(o);
});
