import {BaseGameObject} from "./objects/base";

export class GameMap {
    private objects: BaseGameObject[]
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
            resolutionWidth: 500,
            resolutionHeight: 100,
        }
    }

    public register(object: BaseGameObject) {
        this.objects.push(object);
    }

    public getAllObjects(): BaseGameObject[] {
        return this.objects;
    }

    private pointInSquare(point: [number, number], square: [number, number, number, number]): boolean {
        const [pointX, pointY] = point;
        const [squareX, squareY, squareWidth, squareHeight] = square;
        return pointX > squareX && squareX < squareX + squareWidth &&
            pointY > squareY && pointY < squareY + squareHeight
    }

    public getVisibleObjects(): BaseGameObject[] {
        return this.objects.filter((object) => {
            const [[objectX, objectY], [objectWidth, objectHeight]] = object.getVisibilityBorders();

            const leftTopPoint: [number, number] = [objectX, objectY];
            const leftBottomPoint: [number, number] = [objectX, objectY + objectHeight];
            const rightTopPoint: [number, number] = [objectX + objectWidth, objectY];
            const rightBottomPoint: [number, number] = [objectX + objectWidth, objectY + objectHeight];

            const visibleSquare: [number, number, number, number] = [
                this.cameraPosition.x,
                this.cameraPosition.y,
                this.cameraPosition.resolutionWidth,
                this.cameraPosition.resolutionHeight,
            ];

            return this.pointInSquare(leftTopPoint, visibleSquare) ||
                this.pointInSquare(leftBottomPoint, visibleSquare) ||
                this.pointInSquare(rightTopPoint, visibleSquare) ||
                this.pointInSquare(rightBottomPoint, visibleSquare) ||
                (
                    objectX < this.cameraPosition.x &&
                    objectX + objectWidth > this.cameraPosition.x + this.cameraPosition.resolutionWidth &&
                    objectY < this.cameraPosition.y &&
                    objectY + objectHeight > this.cameraPosition.y + this.cameraPosition.resolutionHeight
                )
        });
    }

    public getDrawDataFromObject(object: BaseGameObject): DrawData {
        let draw_data = object.handleRender();
        draw_data.destinationCenterX = (this.cameraPosition.x + draw_data.destinationCenterX) * window.innerWidth / this.cameraPosition.resolutionWidth;
        draw_data.destinationCenterY = (this.cameraPosition.y + draw_data.destinationCenterY) * window.innerHeight / this.cameraPosition.resolutionHeight;
        draw_data.destinationWidth *= window.innerWidth / this.cameraPosition.resolutionWidth;
        draw_data.destinationHeight *= window.innerHeight / this.cameraPosition.resolutionHeight;
        return draw_data;
    }
}
