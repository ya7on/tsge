import {ObjectBorders} from "./global";

export function pointInSquare(point: [number, number], square: ObjectBorders): boolean {
    const [pointX, pointY] = point;
    const [[squareX, squareY], [squareWidth, squareHeight]] = square;
    return pointX > squareX && pointX < squareX + squareWidth &&
        pointY > squareY && pointY < squareY + squareHeight
}

export function objectOverObject(
    object1: ObjectBorders,
    object2: ObjectBorders,
): boolean {
    const [[object1X, object1Y], [object1Width, object1Height]] = object1;
    const [[object2X, object2Y], [object2Width, object2Height]] = object2;

    const isFullOver = object1X < object2X &&
        object1X + object1Width > object2X + object2Width &&
        object1Y < object2Y &&
        object1Y + object1Height > object2Y + object2Height;
    const isVerticalOver = (
            (object1X > object2X && object1X < object2X + object2Width) ||
            (object1X + object1Width > object2X && object1X + object1Width < object2X + object2Width)
        ) &&
        object1Y < object2Y &&
        object1Y + object1Height > object2Y + object2Height;
    const isHorizontalOver = (
            (object1Y > object2Y && object1Y < object2Y + object2Height) ||
            (object1Y + object1Height > object2Y && object1Y + object1Height < object2Y + object2Height)
        ) &&
        object1X < object2X &&
        object1X + object1Width > object2X + object2Width;

    return isFullOver || isVerticalOver || isHorizontalOver;
}

export function checkCollision(object1: ObjectBorders, object2: ObjectBorders): boolean {
    const [[object1X, object1Y], [object1Width, object1Height]] = object1;

    const leftTopPoint: [number, number] = [object1X, object1Y];
    const leftBottomPoint: [number, number] = [object1X, object1Y + object1Height];
    const rightTopPoint: [number, number] = [object1X + object1Width, object1Y];
    const rightBottomPoint: [number, number] = [object1X + object1Width, object1Y + object1Height];

    return pointInSquare(leftTopPoint, object2) ||
        pointInSquare(leftBottomPoint, object2) ||
        pointInSquare(rightTopPoint, object2) ||
        pointInSquare(rightBottomPoint, object2)
        // objectOverObject(object1, object2);
}
