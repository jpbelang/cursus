import "reflect-metadata";
import {createConnection} from "typeorm";
import {Gender, User} from "./entities";

console.log("help me")

createConnection({
    type: "sqlite",
    database: "cursus2.db",
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    // here you can start to work with your entities
    const auth = User.newUser({email: "jp@fun.com", password: "myPassword", name: "JP B", gender: Gender.MALE})
    const authSaved = await connection.manager.save(auth)
    console.log(authSaved)

}).catch(error => console.log(error));
