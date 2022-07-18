import {BaseGameObject, Options} from "./base";
import {KeyProperties} from "../keyboardEmitter";

export class PlayableObject extends BaseGameObject {
    private rotation: {
        target: number | null;
        current: number;
        direction: "clockwise" | "counterclockwise" | null,
        lastAction: number,
    };
    private move: {
        target: number;
        current: number;
    }

    constructor(options: Options) {
        super(options);

        this.rotation = {
            target: 0,
            current: 0,
            direction: null,
            lastAction: 0,
        };
        this.move = {
            target: 0,
            current: 0,
        }
    }

    private getTargetDirection(keyboard: KeyProperties) {
        let horizontal: number = 0;
        if (keyboard.KeyA.pressed) {
            horizontal -= 1;
        }
        if (keyboard.KeyD.pressed) {
            horizontal += 1;
        }

        let vertical: number = 0;
        if (keyboard.KeyW.pressed) {
            vertical += 1;
        }
        if (keyboard.KeyS.pressed) {
            vertical -= 1;
        }

        if (horizontal || vertical) {
            let newDirection = Math.atan2(vertical, horizontal) * (180 / Math.PI);
            if (newDirection < 0) newDirection += 360;
            if (newDirection !== this.rotation.target) {
                this.calcuclateRotationDirection(newDirection);
            }
            this.rotation.target = newDirection;
        } else {
            this.rotation.target = null;
        }
    }

    private calcuclateRotationDirection(targetDirection: number) {
        let relativeAngle = (targetDirection - this.rotation.current);
        if (!relativeAngle) return;
        if (relativeAngle > 180) relativeAngle -= 360;
        if (relativeAngle <= -180) relativeAngle += 360;
        if (relativeAngle > 0) {
            this.rotation.direction = "counterclockwise";
        }
        if (relativeAngle < 0) {
            this.rotation.direction = "clockwise";
        }
        console.log(this.rotation.current, this.rotation.direction);
    }

    private rotate() {
        switch (this.rotation.direction) {
            case "clockwise":
                this.rotation.current -= 5;
                break
            case "counterclockwise":
                this.rotation.current += 5;
                break
        }
    }

    public handleStep(keyboard: KeyProperties) {
        super.handleStep(keyboard);

        this.rotation.current = this.rotation.current % 360;
        if (this.rotation.current < 0) this.rotation.current += 360;

        this.getTargetDirection(keyboard);

        if (this.rotation.target === this.rotation.current) {
            this.rotation.direction = null;
        }
        if (this.rotation.target !== null) {
            this.rotate();

            this.position.x += 3 * Math.cos((Math.PI / 180) * this.rotation.current);
            this.position.y -= 3 * Math.sin((Math.PI / 180) * this.rotation.current);
        }
    }

    public onRender(): void {
    }

    public onStep(keyboard: KeyProperties): void {
    }

}
