/**
 * @packageDocumentation
 * @alpha
 *
 * ### TypeScript Game Engine
 *
 * - [Документация по интерфейсу](https://ya7on.github.io/tsge/)
 * - [NPM](https://www.npmjs.com/package/tsge)
 * - [Исходный код](https://github.com/ya7on/tsge)
 *
 * @author https://github.com/ya7on
 *
 * ### Установка и настройка
 *
 * ```sh
 * npm i --save tsge
 * ```
 *
 * Создайте HTML элемент `<canvas />`
 * ```html
 * <html>
 *     <head></head>
 *     <body>
 *         <!-- ... -->
 *         <canvas id="canvas"></canvas>
 *         <!-- ... -->
 *     </body>
 * </html>
 * ```
 *
 * Внутри вашего проекта передайте его в конструктор класса {@link Engine}
 * ```typescript
 * const canvasElement = <HTMLCanvasElement>document.getElementById("canvas");
 * const engine = new Engine(canvasElement);
 * ```
 */
import {BaseEntity, BaseEntityOptions} from "./entities/base";
import {Engine} from "./engine";
import {Canvas} from "./canvas";
import {DrawData, ObjectBorders} from "./global";
import {EngineError} from "./error";
import {GameMap} from "./map";
import {KeyboardEmitter, KeyProperties} from "./keyboardEmitter";
import {KeyboardKeys} from "./keys";
import {PlayableObject} from "./entities/playableObject";
import {Sprite, SpriteFrame} from "./sprite";
import {Ticker, TickerCallback, TickerEvents} from "./ticker";

export {
    Canvas,
    DrawData,
    Engine,
    GameMap,
};

export declare namespace collision {
    export {
        ObjectBorders,
    }
}

export declare namespace entities {
    export {
        BaseEntity,
        BaseEntityOptions,
        PlayableObject
    }
}

export declare namespace err {
    export {
        EngineError
    }
}

export declare namespace keys {
    export {
        KeyboardEmitter,
        KeyboardKeys,
        KeyProperties,
    }
}

export declare namespace sprites {
    export {
        Sprite,
        SpriteFrame,
    }
}

export declare namespace ticker {
    export {
        Ticker,
        TickerCallback,
        TickerEvents,
    }
}
