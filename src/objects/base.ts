import {Sprite} from "../sprite";
import {KeyProperties} from "../keyboardEmitter";

export interface Options {
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
        this.previousPosition = structuredClone(this.position);
        this.sprite = options.sprite || Sprite.getDefaultSprite();
    }

    public handleStep(_keyboard: KeyProperties) {
        this.sprite.handleStep();
    }

    public handleRender(): DrawData {
        const sprite_frame = this.sprite.getActiveFrame();
        sprite_frame.destinationCenterX += this.position.x;
        sprite_frame.destinationCenterY += this.position.y;
        return sprite_frame
    }

    public getVisibilityBorders(): ObjectBorders {
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

    public onCollision<T>(object: T) {
        this.position = structuredClone(this.previousPosition);
    }

    abstract onStep(keyboard: KeyProperties): void
    abstract onRender(): void
}
