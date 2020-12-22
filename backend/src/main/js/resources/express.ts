import {validateMessage, ValidationTags} from "./validation";
import {NextFunction, Request, Response} from "express";
import {ValidationError} from "class-validator";


type MessageFactory<T> = (req: Request) => T

export const defaultValidator = <T>(type: string[], value: T) => validateMessage(value, type);

export class RestValidationTags extends ValidationTags {

    static create() {
        return ["create"]
    }

    static update() {
        return ["update"]
    }
}

export function expressValidator<T>(
    factory: MessageFactory<T>,
    validator: (method: string[], value: T) => ValidationError[] =  defaultValidator) {

    return (req: Request, resp: Response, next: NextFunction) => {
        const value = factory(req.body)
        const res = validator(req.method == "POST"? RestValidationTags.create():RestValidationTags.update(), value)
        if (res.length != 0) {
            resp.status(400).send()
        } else {
            next()
        }
    }
}