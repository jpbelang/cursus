import {plainToClass} from "class-transformer";
import {ClassType} from "class-transformer/ClassTransformer";


export function defaultFromNetwork<T>(s: any | string, cls: ClassType<T>): T {

    if (typeof s == "string") {
        s = JSON.parse(s)
    }
    return plainToClass(cls, s, {
        excludeExtraneousValues: true
    })
}

type ObjectFactory<T> = (t: string|any)  =>  T
