import {User} from "../../../main/js/entities/user";
import {Gender} from "../../../main/js/entities/common";
import {UserMessage} from "../../../main/js/resources/users";
import {validateMessage} from "../../../main/js/resources/utilities";

describe('users and friends', function() {

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

            const foo = await validateMessage((s) => UserMessage.fromNetwork(s))(req, {} as any, () => {} )

            expect(req.body).toEqual({
                email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy"
            })
        })
    }
)