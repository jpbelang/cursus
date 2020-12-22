import {plainToClass} from "class-transformer";
import {IsDefined} from "class-validator";
import {validateMessage, ValidationTags} from "../../../main/js/resources/validation";

describe('validate', () => {

    class SomeThing {
        @IsDefined({
            groups: ValidationTags.any()
        })
        name: string
    }

    it('should succeed on valid message', async () => {

        let someThing = plainToClass(SomeThing, {name: "Dave"});
        const validationResult = await validateMessage(someThing, ValidationTags.any())

        expect(validationResult).toHaveLength(0)
    });

    it('should fail on invalid message', async () => {

        let someThing = plainToClass(SomeThing, {});
        const validationResult = await validateMessage(someThing, ValidationTags.any())

        expect(validationResult).toHaveLength(1)
    });
});
