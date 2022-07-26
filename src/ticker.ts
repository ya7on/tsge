export type TickerCallback = () => void;

export enum TickerEvents {
    Render = "Render",
    Step = "Step"
}

/**
 * Ticker
 */
export class Ticker {
    private nextAnimationFrame: number;
    private tickerIntervalID: NodeJS.Timer;

    private readonly tickers: {
        [key in TickerEvents]: TickerCallback[]
    };

    constructor() {
        this.tickers = {
            [TickerEvents.Render]: [],
            [TickerEvents.Step]: [],
        };
        this.nextAnimationFrame = requestAnimationFrame(() => this.renderTick());
        this.tickerIntervalID = setInterval(() => {this.stepTick();}, 0);
    }

    private renderTick() {
        for (const ticker of this.tickers[TickerEvents.Render]) {
            ticker();
        }

        this.nextAnimationFrame = requestAnimationFrame(() => this.renderTick());
    }

    private stepTick() {
        for (const ticker of this.tickers[TickerEvents.Step]) {
            ticker();
        }
    }

    public createTicker(event: TickerEvents, callback: TickerCallback) {
        this.tickers[event].push(callback);
    }
}
