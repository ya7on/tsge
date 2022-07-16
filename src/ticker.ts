type TickerCallback = () => void;

export enum TickerEvents {
    OnRender = "OnRender",
    OnStep = "OnStep"
}

export class Ticker {
    private nextAnimationFrame: number;
    private tickerIntervalID: NodeJS.Timer;

    private readonly tickers: {
        [key in TickerEvents]: TickerCallback[]
    };

    constructor() {
        this.tickers = {
            [TickerEvents.OnRender]: [],
            [TickerEvents.OnStep]: [],
        };
        this.nextAnimationFrame = requestAnimationFrame(() => this.renderOnce());
        this.tickerIntervalID = setInterval(() => {this.stepOnce();}, 0);
    }

    private renderOnce() {
        for (const ticker of this.tickers[TickerEvents.OnRender]) {
            ticker();
        }

        this.nextAnimationFrame = requestAnimationFrame(() => this.renderOnce());
    }

    private stepOnce() {
        for (const ticker of this.tickers[TickerEvents.OnStep]) {
            ticker();
        }
    }

    public createTicker(event: TickerEvents, callback: TickerCallback) {
        this.tickers[event].push(callback);
    }
}
