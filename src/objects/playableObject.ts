import {BaseGameObject, Options} from "./base";
import {KeyProperties} from "../keyboardEmitter";

export class PlayableObject extends BaseGameObject {
    private horizontalTargetDirection: -1 | 0 | 1;
    private verticalTargetDirection: -1 | 0 | 1;
    private directionAngle: number;
    private speed: number;

    constructor(options: Options) {
        super(options);
        this.horizontalTargetDirection = 0;
        this.verticalTargetDirection = 0;
        this.directionAngle = 0;
        this.speed = 0;
    }

    handleStep(keyboard: KeyProperties) {
        super.handleStep(keyboard);

        this.horizontalTargetDirection = 0;
        this.verticalTargetDirection = 0;
        this.speed = 0;
        const speed = 0.5;

        if (keyboard.KeyD.pressed) {
            this.previousPosition.x = this.position.x;
            this.horizontalTargetDirection += 1;
            this.speed = speed;
        }
        if (keyboard.KeyA.pressed) {
            this.previousPosition.x = this.position.x;
            this.horizontalTargetDirection -= 1;
            this.speed = speed;
        }
        if (keyboard.KeyW.pressed) {
            this.previousPosition.y = this.position.y;
            this.verticalTargetDirection -= 1;
            this.speed = speed;
        }
        if (keyboard.KeyS.pressed) {
            this.previousPosition.y = this.position.y;
            this.verticalTargetDirection += 1;
            this.speed = speed;
        }

        this.directionAngle =
            Math.atan2(this.verticalTargetDirection, this.horizontalTargetDirection) * 180 / Math.PI;

        this.position.x += this.speed * Math.cos((Math.PI / 180) * this.directionAngle);
        this.position.y += this.speed * Math.sin((Math.PI / 180) * this.directionAngle);
    }

    onRender(): void {
    }

    onStep(keyboard: KeyProperties): void {
    }

}
