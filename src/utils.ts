import {EngineError} from "./error";

export function unwrapOptional<T>(value: T | null | undefined): T {
    if (value) {
        return value;
    }
    throw new EngineError();
}
