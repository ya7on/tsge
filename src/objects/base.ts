import {Sprite} from "../sprite";
import {KeyProperties} from "../keyboardEmitter";
import {DrawData, ObjectBorders} from "../global";

/**
 * Базовый интерфейс опций создания игрового объекта
 */
export interface BaseEntityOptions {
    /** Стартовая позиция объекта */
    position?: {
        x: number,
        y: number,
    },
    /** Стартовый спрайт объекта */
    sprite?: Sprite
}

/**
 * Базовый игровой объект, от которого наследуются все игровые сущности.
 *
 * @group Entities
 */
export abstract class BaseEntity {
    public position: {
        x: number,
        y: number
    };
    private sprite: Sprite;

    constructor(options: BaseEntityOptions) {
        this.position = options.position || { x: 0, y: 0 };
        this.sprite = options.sprite || Sprite.getDefaultSprite();
    }

    /**
     * Системный метод обработки шага для объекта,
     * вызывается каждый {@link !Ticker.stepOnce | тик шага}.
     *
     * @param {KeyProperties} _keyboard - информация о текущих нажатых клавишах
     */
    public handleStep(_keyboard: KeyProperties) {
        this.sprite.handleStep();
    }

    /**
     * Системный метод обработки рендера для объекта,
     * вызывается каждый {@link !Ticker.renderOnce | тик рендера},
     * получает данные о рендере объекта и передает их наверх
     */
    public handleRender(): DrawData {
        const sprite_frame = this.sprite.getActiveFrame();
        sprite_frame.destinationCenterX += this.position.x;
        sprite_frame.destinationCenterY += this.position.y;
        return sprite_frame
    }

    /**
     * Получает текущие видимые границы объекта
     */
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

    /**
     * Пользовательский метод обработки шага,
     * вызывается каждый {@link !Ticker.stepOnce | тик шага}.
     *
     * @param {KeyProperties} keyboard - информация о текущих нажатых клавишах
     */
    abstract onStep(keyboard: KeyProperties): void

    /**
     * Пользовательский метод обработки рендера,
     * вызывается каждый {@link !Ticker.renderOnce | тик рендера}.
     */
    abstract onRender(): void
}
