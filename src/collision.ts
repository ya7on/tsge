export function pointInSquare(point: [number, number], square: [number, number, number, number]): boolean {
    const [pointX, pointY] = point;
    const [squareX, squareY, squareWidth, squareHeight] = square;
    return pointX > squareX && squareX < squareX + squareWidth &&
        pointY > squareY && pointY < squareY + squareHeight
}

export function objectOverObject(
    object1: [number, number, number, number],
    object2: [number, number, number, number],
): boolean {
    const [object1X, object1Y, object1Width, object1Height] = object1;
    const [object2X, object2Y, object2Width, object2Height] = object2;

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
