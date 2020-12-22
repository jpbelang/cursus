import {anyNumber, instance, mock, verify, when} from "ts-mockito";
import {defaultValidator, expressValidator, RestValidationTags} from "../../../main/js/resources/express";
import {IsDefined, ValidationError} from "class-validator";
import {plainToClass} from "class-transformer";
import {Request, Response} from "express"
import {when as whenj} from "jest-when"
import {ValidationTags} from "../../../main/js/resources/validation";


describe('in express', () => {

    describe('validation adaptor', () => {

        class SomeThing {
            @IsDefined({
                groups: ValidationTags.any()
            })
            name: string
        }

        it('should continue processing on validation success', () => {

            const objectToValidate = plainToClass(SomeThing, {name: "Foo"});

            const {mockRequest, mockResponse, nextFunction, validatorFunction} = setupMocks(objectToValidate, []);

            when(mockRequest.method).thenReturn("POST")
            whenj(validatorFunction).calledWith(RestValidationTags.create(), objectToValidate ).mockReturnValueOnce([])

            const expressValidatorFunction = expressValidator( () => objectToValidate, validatorFunction)
            expressValidatorFunction(instance(mockRequest), instance(mockResponse), nextFunction)

            expect(validatorFunction).toHaveBeenCalledWith(RestValidationTags.create(), objectToValidate)
            expect(nextFunction).toHaveBeenCalled()

        });

        it('should set RC to 400 on validation failure', () => {

            const objectToValidate = plainToClass(SomeThing, {name: "Foo"});
            const {mockRequest, mockResponse, nextFunction, validatorFunction} = setupMocks(objectToValidate, [new ValidationError()]);

            const expressValidatorFunction = expressValidator( () => objectToValidate, validatorFunction)
            expressValidatorFunction(instance(mockRequest), instance(mockResponse), nextFunction)

            expect(validatorFunction).toHaveBeenCalledWith(RestValidationTags.create(), objectToValidate)
            expect(nextFunction).not.toHaveBeenCalled()
            verify(mockResponse.status(400)).called()
            verify(mockResponse.send()).called()
        });

        function setupMocks(objectToValidate: SomeThing, errors: ValidationError[]) {
            const mockRequest = mock<Request>()
            const mockResponse = mock<Response>()
            const nextFunction = jest.fn()
            const validatorFunction = jest.fn()

            when(mockRequest.method).thenReturn("POST")
            whenj(validatorFunction).calledWith(RestValidationTags.create(), objectToValidate).mockReturnValueOnce(errors)
            when(mockResponse.status(anyNumber())).thenReturn(instance(mockResponse))
            return {mockRequest, mockResponse, nextFunction, validatorFunction};
        }
    });

    describe('default validation function', () => {

        class SomeThing {

            @IsDefined({
                groups: ["forthis"]
            })
            name: string
        }

        it('should call the validator', () => {
            const errors = defaultValidator(["forthis"], plainToClass(SomeThing, {nothingIsThere: "foo"}) )
            expect(errors).toHaveLength(1)
        });
    });
});
