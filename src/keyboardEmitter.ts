import {KeyboardKeys} from "./keys";

export type KeyProperties = {
    [key in KeyboardKeys]: {
        pressed: boolean,
        lastPressed: number,
        lastReleased: number,
    }
}

function defaultKeyboardKeys(): KeyProperties {
    return <KeyProperties>Object
        .values(KeyboardKeys)
        .map((item) => item.toString()).reduce((acc, cur, i) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
            acc[cur] = {
                pressed: false,
                lastPressed: 0,
                lastReleased: 0,
            };
            return acc;
        }, {});
}

export class KeyboardEmitter {
    public keysPressed: KeyProperties;

    constructor() {
        this.keysPressed = defaultKeyboardKeys();
        document.addEventListener("keydown", (event) => this.onKeyPressed(event));
        document.addEventListener("keyup", (event) => this.onKeyReleased(event));
    }

    private onKeyPressed(event: KeyboardEvent) {
        if ((<string[]>Object.values(KeyboardKeys)).includes(event.code)) {
            if (!this.keysPressed[<KeyboardKeys>event.code].pressed) {
                this.keysPressed[<KeyboardKeys>event.code].pressed = true;
                this.keysPressed[<KeyboardKeys>event.code].lastPressed = Date.now();
            }
        }
    }

    private onKeyReleased(event: KeyboardEvent) {
        if ((<string[]>Object.values(KeyboardKeys)).includes(event.code)) {
            if (this.keysPressed[<KeyboardKeys>event.code].pressed) {
                this.keysPressed[<KeyboardKeys>event.code].pressed = false;
                this.keysPressed[<KeyboardKeys>event.code].lastReleased = Date.now();
            }
        }
    }
}
