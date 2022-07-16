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

interface Frame {
    source: CanvasImageSource,
    imageX: number,
    imageY: number,
    imageWidth: number,
    imageHeight: number,
    imageCenterX: number,
    imageCenterY: number,
    resolutionWidth: number,
    resolutionHeight: number,
}

export class Sprite {
    private frames: Frame[] = [];

    public getActiveFrame(): Frame {
        return this.frames[0];
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
            imageX: imageX || 0,
            imageY: imageY || 0,
            imageWidth: imageWidth || <number>source.width,
            imageHeight: imageHeight || <number>source.height,
            imageCenterX: imageCenterX || 0,
            imageCenterY: imageCenterY || 0,
            resolutionWidth: resolutionWidth || <number>source.width,
            resolutionHeight: resolutionHeight || <number>source.height,
        });
    }

    static getDefaultSprite(): Sprite {
        const default_sprite = new Sprite();
        default_sprite.addFrame(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Unknown_toxicity_icon.svg/554px-Unknown_toxicity_icon.svg.png",
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
