import {BaseEntity} from "./objects/base";
import {checkCollision} from "./collision";
import {DrawData, ObjectBorders} from "./global";

export class GameMap {
    private objects: BaseEntity[]
    private cameraPosition: {
        x: number,
        y: number,
        resolutionWidth: number,
        resolutionHeight: number,
    }

    constructor() {
        this.objects = []
        this.cameraPosition = { // FIXME
            x: 0,
            y: 0,
            resolutionWidth: 1366,
            resolutionHeight: 768,
        }
    }

    public register(object: BaseEntity) {
        this.objects.push(object);
    }

    public getAllObjects(): BaseEntity[] {
        return this.objects;
    }

    public getVisibleObjects(): BaseEntity[] {
        return this.objects.filter((object) => {
            const objectSquare = object.getVisibilityBorders();
            const visibleSquare: ObjectBorders = [
                [
                    this.cameraPosition.x,
                    this.cameraPosition.y,
                ],
                [
                    this.cameraPosition.resolutionWidth,
                    this.cameraPosition.resolutionHeight,
                ]
            ];

            return checkCollision(objectSquare, visibleSquare);
        });
    }

    public getDrawDataFromObject(object: BaseEntity): DrawData {
        let draw_data = object.handleRender();
        draw_data.destinationCenterX = (this.cameraPosition.x + draw_data.destinationCenterX) * window.innerWidth / this.cameraPosition.resolutionWidth;
        draw_data.destinationCenterY = (this.cameraPosition.y + draw_data.destinationCenterY) * window.innerHeight / this.cameraPosition.resolutionHeight;
        draw_data.destinationWidth *= window.innerWidth / this.cameraPosition.resolutionWidth;
        draw_data.destinationHeight *= window.innerHeight / this.cameraPosition.resolutionHeight;
        return draw_data;
    }
}
