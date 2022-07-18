const CACHED_IMAGES: {[key: string]: CanvasImageSource,} = {};

interface SpriteFrame {
    frame: DrawData,
    length: number,
}

function getOrAddCachedImage(url: string): CanvasImageSource {
    const cached = CACHED_IMAGES[url];
    if (cached) {
        return cached;
    }

    const img = new Image();
    img.src = url;
    CACHED_IMAGES[url] = img;
    return img;
}

export class Sprite {
    private frameNum: number;
    private frameUpdated: number;
    private frames: SpriteFrame[] = [];

    constructor() {
        this.frameNum = 0;
        this.frameUpdated = Date.now();
    }

    public getActiveFrame(): DrawData {
        let frame = this.frames[this.frameNum].frame;
        return {
            source: frame.source,
            sourceX: frame.sourceX,
            sourceY: frame.sourceY,
            sourceWidth: frame.sourceWidth,
            sourceHeight: frame.sourceHeight,
            destinationCenterX: structuredClone(frame.destinationCenterX),
            destinationCenterY: structuredClone(frame.destinationCenterY),
            destinationWidth: structuredClone(frame.destinationWidth),
            destinationHeight: structuredClone(frame.destinationHeight)
        }
    }

    public handleStep() {
        let currentFrame = this.frames[this.frameNum];
        let timeDelta = Date.now() - this.frameUpdated;
        if (timeDelta > currentFrame.length) {
            this.nextFrame();
        }
    }

    public nextFrame() {
        this.frameNum += 1;
        if (this.frameNum >= this.frames.length) {
            this.frameNum = 0;
        }
        this.frameUpdated = Date.now();
    }

    public addFrame(url: string, length: number,): void;
    public addFrame(
        url: string,
        length: number,
        imageX: number,
        imageY: number,
        imageWidth: number,
        imageHeight: number,
    ): void
    public addFrame(
        url: string,
        length: number,
        imageX: number,
        imageY: number,
        imageWidth: number,
        imageHeight: number,
        imageCenterX: number,
        imageCenterY: number,
    ): void
    public addFrame(
        url: string,
        length: number,
        imageX: number,
        imageY: number,
        imageWidth: number,
        imageHeight: number,
        imageCenterX: number,
        imageCenterY: number,
        resolutionWidth: number,
        resolutionHeight: number,
    ): void
    public addFrame(
        url: string,
        length: number,
        imageX?: number,
        imageY?: number,
        imageWidth?: number,
        imageHeight?: number,
        imageCenterX?: number,
        imageCenterY?: number,
        resolutionWidth?: number,
        resolutionHeight?: number,
    ){
        const source = getOrAddCachedImage(url);
        this.frames.push({
            frame: {
                source,
                sourceX: imageX || 0,
                sourceY: imageY || 0,
                sourceWidth: imageWidth || <number>source.width,
                sourceHeight: imageHeight || <number>source.height,
                destinationCenterX: imageCenterX || 0,
                destinationCenterY: imageCenterY || 0,
                destinationWidth: resolutionWidth || <number>source.width,
                destinationHeight: resolutionHeight || <number>source.height,
            },
            length,
        });
    }

    static getDefaultSprite(): Sprite {
        const default_sprite = new Sprite();
        default_sprite.addFrame(
            "https://neokardinki.ru/pictures/akvariumnye-krevetki-spektr-sveta-265_1.jpg",
            1000,
            0,
            0,
            15,
            15,
            0,
            0,
            32,
            32,
        );
        default_sprite.addFrame(
            "https://neokardinki.ru/pictures/akvariumnye-krevetki-spektr-sveta-265_1.jpg",
            500,
            80,
            20,
            15,
            15,
            0,
            0,
            32,
            32,
        );
        default_sprite.addFrame(
            "https://neokardinki.ru/pictures/akvariumnye-krevetki-spektr-sveta-265_1.jpg",
            250,
            160,
            20,
            15,
            15,
            0,
            0,
            32,
            32,
        );
        return default_sprite;
    }
}
