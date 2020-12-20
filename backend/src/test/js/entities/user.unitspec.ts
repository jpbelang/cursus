import {User} from "../../../main/js/entities/user";
import {Gender} from "../../../main/js/entities/common";

describe('with user', function() {

        it("creates password", async () => {

            const user = User.newUser({
                email: "jpbelang@place.com", gender: Gender.MALE, name: "JP Belanger", password: "funguy"
            })

            expect(user.saltedPassword).not.toEqual("funguy")
            expect(user.id).toMatch(/[a-f0-9-]+/)
            expect((user as any ).password).not.toBeDefined()
        })
    }
)