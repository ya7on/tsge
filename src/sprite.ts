const CACHED_IMAGES: {[key: string]: CanvasImageSource,} = {};

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
    private frames: DrawData[] = [];

    public getActiveFrame(): DrawData {
        let frame = this.frames[0];
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

    public addFrame(url: string): void;
    public addFrame(
        url: string,
        imageX: number,
        imageY: number,
        imageWidth: number,
        imageHeight: number,
    ): void
    public addFrame(
        url: string,
        imageX: number,
        imageY: number,
        imageWidth: number,
        imageHeight: number,
        imageCenterX: number,
        imageCenterY: number,
    ): void
    public addFrame(
        url: string,
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
            source,
            sourceX: imageX || 0,
            sourceY: imageY || 0,
            sourceWidth: imageWidth || <number>source.width,
            sourceHeight: imageHeight || <number>source.height,
            destinationCenterX: imageCenterX || 0,
            destinationCenterY: imageCenterY || 0,
            destinationWidth: resolutionWidth || <number>source.width,
            destinationHeight: resolutionHeight || <number>source.height,
        });
    }

    static getDefaultSprite(): Sprite {
        const default_sprite = new Sprite();
        default_sprite.addFrame(
            "https://www.imgonline.com.ua/examples/lanczos.png",
            0,
            0,
            0,
            0,
            0,
            0,
            32,
            32,
        );
        return default_sprite;
    }
}
