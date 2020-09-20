import {UserMessage} from "../../../main/js/resources/users";
import {Gender} from "../../../main/js/entities/common";

import request from 'supertest';
import {createApplication, createConnectionOptions} from "../../../main/js/application";
import {createConnection} from "typeorm";

describe('users resource test', function () {

    it("create a user", async () => {

        const connection = await createConnection(createConnectionOptions(":memory:"))
        const app = createApplication(connection.createEntityManager())

        const res = await request(app)
            .post("/users")
            .set('Accept', 'application/json')
            .set("Content-Type", "application/json")
            .send({
                email: "jp@fun.com", gender: Gender.MALE, name: "Hello", password: "kjhsdflkjsdfB"
            } as UserMessage)
            .expect(201)

        expect(res.body).toEqual(expect.objectContaining({
            email: "jp@fun.com", gender: Gender.MALE, name: "Hello"
        }))
        expect(res.body.id).toMatch(/[a-z0-9-]+/)
        expect(res.body.password).not.toBeDefined()

        console.log(res)
    })
})
