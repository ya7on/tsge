import {Sprite} from "../sprite";
import {Canvas} from "../canvas";
import {KeyProperties} from "../keyboardEmitter";

interface Options {
    position?: {
        x: number,
        y: number,
    },
    sprite?: Sprite
}

export abstract class BaseGameObject {
    public position: {
        x: number,
        y: number
    };
    public previousPosition: {
        x: number,
        y: number,
    };
    private sprite: Sprite;

    constructor(options: Options) {
        this.position = options.position || { x: 0, y: 0 };
        this.previousPosition = this.position;
        this.sprite = options.sprite || Sprite.getDefaultSprite();
    }

    public handleStep(_keyboard: KeyProperties) {
        // TODO
    }

    public handleRender(): DrawData {
        const sprite_frame = this.sprite.getActiveFrame();
        sprite_frame.destinationCenterX += this.position.x;
        sprite_frame.destinationCenterY += this.position.y;
        return sprite_frame
    }

    public getVisibilityBorders(): [[number, number], [number, number]] {
        const sprite_frame = this.sprite.getActiveFrame();
        return [
            [
                this.position.x - sprite_frame.destinationCenterX,
                this.position.y - sprite_frame.destinationCenterY
            ], [
                sprite_frame.destinationWidth,
                sprite_frame.destinationHeight,
            ]
        ]
    }

    abstract onStep(keyboard: KeyProperties): void
    abstract onRender(): void
}
