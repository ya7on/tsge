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

    public handleRender(canvas: Canvas) {
        // FIXME
        const sprite_frame = this.sprite.getActiveFrame();
        canvas.drawSpriteFrame(
            <CanvasImageSource>sprite_frame.source,
            sprite_frame.imageX,
            sprite_frame.imageY,
            sprite_frame.imageWidth,
            sprite_frame.imageHeight,
            this.position.x - sprite_frame.imageCenterX,
            this.position.y - sprite_frame.imageCenterY,
            sprite_frame.resolutionHeight,
            sprite_frame.resolutionWidth,
        );
    }

    abstract onStep(keyboard: KeyProperties): void
    abstract onRender(canvas: Canvas): void
}
