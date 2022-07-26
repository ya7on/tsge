import {Canvas} from "./canvas";
import {Ticker, TickerEvents} from "./ticker";
import {KeyboardEmitter} from "./keyboardEmitter";
import {GameMap} from "./map";
import {BaseEntity} from "./entities/base";

/**
 * Основной класс приложения.
 *
 * @group System
 *
 * @example
 * Пример создания нового приложения. Вам нужен Canvas HTML элемент, в котором будет происходить рендер
 * ```html
 * <canvas id="canvas"><canvas/>
 * ```
 * Передайте этот элемент внутрь класса `Engine`
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
     * @param {HTMLCanvasElement} element - HTML Canvas элемент, к которому крепится приложение
     */
    constructor(element: HTMLCanvasElement) {
        this.canvas = new Canvas(element);
        this.ticker = new Ticker();
        this.keyboardEmitter = new KeyboardEmitter();
        this.map = new GameMap();

        this.ticker.createTicker(TickerEvents.Render, () => this.handleRender());
        this.ticker.createTicker(TickerEvents.Step, () => this.handleStep());
    }

    /**
     * Ручная регистрация объекта в приложении
     * Пока объект не зарегистрирован, с ним не происходит взаимодействия
     *
     * @param {BaseEntity} object
     */
    public register(object: BaseEntity) {
        this.map.register(object);
    }

    /**
     * Вызывается каждый {@link ticker | тик рендера},
     * проходит по всем видимым зарегистрированным объектам и рисует их на {@link Canvas | холсте}
     */
    private handleRender() {
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

    /**
     * Вызывается каждый {@link ticker | тик шага},
     * пробегает по всем зарегистрированным объектам в игре и вызывает в них методы:
     * `handleStep`, `onStep`
     */
    private handleStep() {
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
