import {defaultFromNetwork, validateMessage} from "../../../main/js/resources/utilities";
import {Expose, plainToClass} from "class-transformer";
import {IsDefined} from "class-validator";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {NextFunction, Request, Response} from "express";

describe('in the utilities', () => {

    describe('defaultFromNetwork', () => {

        class SomeThing {
            @Expose()
            name: string
            quad: string
        }

        it('should read a json string but only exposed', () => {

            expect(defaultFromNetwork(`{"name": "Dave", "quad": "left"}`, SomeThing))
                .toEqual({
                    name: "Dave"
                })
        });

        it('should read a plain JS object but only exposed', () => {

            expect(defaultFromNetwork({"name": "Dave", "quad": "left"}, SomeThing))
                .toEqual({
                    name: "Dave"
                })
        });

        it('should fail when reading crap', () => {

            expect(() => defaultFromNetwork("crap", SomeThing))
                .toThrowError()
        });
    });

    describe('validate', () => {

        class SomeThing {
            @IsDefined({
                groups: ["GET"]
            })
            name: string
        }

        it('should succeed on valid message', async () => {

            const req: Request = mock<Request>()
            const resp = mock<Response>()
            const next = jest.fn()

            when(req.method).thenReturn("GET")

            let someThing = plainToClass(SomeThing, {name: "Dave"});
            const validationResult = await validateMessage(() => someThing)
            const goo = await validationResult(instance(req), instance(resp), next)

            expect(next.mock.calls).toHaveLength(1)
        });

        it('should fail on invalid message', async () => {

            const req: Request = mock<Request>()
            const resp = mock<Response>()
            const next = jest.fn()

            when(req.method).thenReturn("GET")
            when(resp.status(anything())).thenReturn(resp)

            let someThing = plainToClass(SomeThing, {});
            const validationResult = await validateMessage(() => someThing)
            const goo = await validationResult(instance(req), instance(resp), next)

            expect(next.mock.calls).toHaveLength(0)
            verify(resp.status(400))
        });

        it('should cleanup contests of message', () => {

        });
    });
});