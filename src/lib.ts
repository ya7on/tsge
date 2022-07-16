import {Canvas} from "./canvas";
import {Ticker, TickerEvents} from "./ticker";
import {EngineError} from "./error";
import {BaseGameObject} from "./objects/base";
import {Sprite} from "./sprite";
import {KeyboardEmitter} from "./keyboardEmitter";

class Engine {
    private readonly canvas: Canvas;
    private readonly ticker: Ticker;
    private readonly objects: BaseGameObject[];
    private readonly keyboardEmitter: KeyboardEmitter;

    constructor(element: HTMLCanvasElement) {
        this.canvas = new Canvas(element);
        this.ticker = new Ticker();
        this.keyboardEmitter = new KeyboardEmitter();

        this.objects = [];

        this.ticker.createTicker(TickerEvents.OnRender, () => this.onRender());
        this.ticker.createTicker(TickerEvents.OnStep, () => this.onStep());
    }

    public register(object: BaseGameObject) {
        this.objects.push(object);
    }

    private onRender() {
        this.canvas.resizeWindow();
        this.canvas.clearCanvas();

        for (const object of this.objects) {
            object.handleRender(this.canvas);
            object.onRender(this.canvas);
        }
    }

    private onStep() {
        for (const object of this.objects) {
            object.handleStep(this.keyboardEmitter.keysPressed);
            object.onStep(this.keyboardEmitter.keysPressed);
        }
    }
}

export default {
    BaseGameObject,
    Engine,
    EngineError,
    Sprite,
};
