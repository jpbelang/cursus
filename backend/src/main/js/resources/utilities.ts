import {plainToClass} from "class-transformer";
import {ClassType} from "class-transformer/ClassTransformer";
import {NextFunction, Request, Response} from "express";
import {validate} from "class-validator";
import {UserMessage} from "./users";


export function defaultFromNetwork<T>(s: any | string, cls: ClassType<T>): T {

    if (typeof s == "string") {
        s = JSON.parse(s)
    }
    return plainToClass(cls, s, {
        excludeExtraneousValues: true
    })
}

type ObjectFactory<T> = (t: string|any)  =>  T
export function validateMessage<T>(data: ObjectFactory<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const t = data(req.body)
        const results = await validate(t, {
            whitelist: true,
            groups: [req.method.toUpperCase()]
        })

        if (results.length != 0) {
            res.status(400).send(results)
            return
        } else {
            req.body = t
            next()
        }
    }
}