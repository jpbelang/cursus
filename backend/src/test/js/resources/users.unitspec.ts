import {User} from "../../../main/js/entities/user";
import {Gender} from "../../../main/js/entities/common";
import {createRepository, UserMessage} from "../../../main/js/resources/users";
import {validateMessage} from "../../../main/js/resources/utilities";
import {EntityManager} from "typeorm";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {NextFunction, Request, Response} from "express";

describe('users and friends', function () {

        it("creates a message", async () => {

            const user = UserMessage.fromNetwork({
                email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy"
            })

            expect(user).toEqual({
                email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy"
            })
        })

        it("creates a message without extras", async () => {

            const user = UserMessage.fromNetwork({
                email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy", boogie: "woogie"
            })

            expect(user).toEqual({
                email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy"
            })
        })

        it("verifies a message", async () => {

            const req = {
                body: {
                    email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy"
                },
                method: "POST"
            } as any

            await validateMessage((s) => UserMessage.fromNetwork(s))(req, {} as any, () => {
            })

            expect(req.body).toEqual({
                email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy"
            })
        })

        it("verifies a put message", async () => {

            const req = {
                body: {
                    email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy"
                },
                method: "PUT"
            } as any

            const res = mock<Response>();
            when(res.status(400)).thenReturn(instance(res))

            await validateMessage((s) => UserMessage.fromNetwork(s))(req, instance(res), () => {
            })

            verify(res.status(400)).called()
            verify(res.send(anything())).called()
        })

        it("verifies a POST message", async () => {

            const req = {
                body: {
                    email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy"
                },
                method: "POST"
            } as any

            const res = mock<Response>();
            when(res.status(anything())).thenReturn(instance(res))
            const next = jest.fn()

            await validateMessage((s) => UserMessage.fromNetwork(s))(req, instance(res), next)

            verify(res.status(400)).atMost(0)
            verify(res.send(anything())).atMost(0)
            expect(next).toHaveBeenCalled()
        })

        it("create repo middleware", async () => {

            const manager = mock<EntityManager>()
            const next = jest.fn()

            const middle = createRepository(instance(manager))

            const req = {} as any
            middle(req, {} as any, next)

            expect(req.repository).toBeDefined()
            expect(next).toHaveBeenCalled()
        })

    }
)