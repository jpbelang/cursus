import {validateSync, ValidationError} from "class-validator";

export class ValidationTags {

    static any() {
        return ["always"]
    }
}

export function validateMessage<T>(object: T, context: string[]): ValidationError[] {

    return validateSync(object, {
        whitelist: true,
        groups: context
    })
}