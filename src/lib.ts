/**
 * hello
 * @packageDocumentation
 */

import {Canvas} from "./canvas";
import {Ticker, TickerEvents} from "./ticker";
import {EngineError} from "./error";
import {BaseGameObject} from "./objects/base";
import {Sprite} from "./sprite";
import {KeyboardEmitter} from "./keyboardEmitter";
import {GameMap} from "./map";

/**
 * Main application class.
 *
 * @example
 * ```html
 * <canvas id="canvas"><canvas/>
 * ```
 * ```typescript
 * const canvasElement = <HTMLCanvasElement>document.getElementById("canvas");
 * const engine = new Engine(canvasElement);
 * ```
 */
export class Engine {
    private readonly canvas: Canvas;
    private readonly ticker: Ticker;
    private readonly keyboardEmitter: KeyboardEmitter;
    private readonly map: GameMap;

    /**
     * @param {HTMLCanvasElement} element - HTML Canvas element to render
     */
    constructor(element: HTMLCanvasElement) {
        this.canvas = new Canvas(element);
        this.ticker = new Ticker();
        this.keyboardEmitter = new KeyboardEmitter();
        this.map = new GameMap();

        this.ticker.createTicker(TickerEvents.OnRender, () => this.onRender());
        this.ticker.createTicker(TickerEvents.OnStep, () => this.onStep());
    }

    /**
     * Registration of game object.
     * If you create new object, you need to register it.
     * @param {BaseGameObject} object
     */
    public register(object: BaseGameObject) {
        this.map.register(object);
    }

    private onRender() {
        this.canvas.resizeWindow();
        this.canvas.clearCanvas();

        for (const object of this.map.getVisibleObjects()) {
            const drawData = this.map.getDrawDataFromObject(object);
            this.canvas.drawSpriteFrame(
                drawData.source,
                drawData.sourceX,
                drawData.sourceY,
                drawData.sourceWidth,
                drawData.sourceHeight,
                drawData.destinationCenterX,
                drawData.destinationCenterY,
                drawData.destinationWidth,
                drawData.destinationHeight,
            )
            object.onRender();
        }
    }

    private onStep() {
        for (const object of this.map.getAllObjects()) {
            object.handleStep(this.keyboardEmitter.keysPressed);
            object.onStep(this.keyboardEmitter.keysPressed);
            // for (const otherObject of this.map.getAllObjects()) {
            //     if (object === otherObject) {
            //         continue;
            //     }
            //     const objectBorders = object.getVisibilityBorders();
            //     const otherObjectBorders = otherObject.getVisibilityBorders();
            //     if (checkCollision(objectBorders, otherObjectBorders)) {
            //         object.onCollision(otherObject);
            //     }
            // }
        }
    }
}

export default {
    BaseGameObject,
    Engine,
    EngineError,
    Sprite,
};
