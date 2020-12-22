import {Gender} from "../../../main/js/entities/common";
import {createRepository, UserMessage} from "../../../main/js/resources/users";
import {EntityManager} from "typeorm";
import {instance, mock} from "ts-mockito";

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

            expect((user as any).boogie).toBeUndefined()
        })

        it("creates a message from an entity", async () => {

            const user = UserMessage.fromEntity({
                email: "jpbelang@place.com",
                gender: Gender.MALE, name: "JP Belanger",
                id: "1",
                saltedPassword: "fjlfkdjlsfdjk",
                version: 0
            } as any )

            expect(user).toEqual({
                email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", id: "1"
            })
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