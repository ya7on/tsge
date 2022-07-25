export type ObjectBorders = [[number, number], [number, number]];

export interface DrawData {
    source: CanvasImageSource,
    sourceX: number,
    sourceY: number,
    sourceWidth: number,
    sourceHeight: number,
    destinationCenterX: number,
    destinationCenterY: number,
    destinationWidth: number,
    destinationHeight: number,
}
