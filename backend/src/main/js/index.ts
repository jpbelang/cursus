import "reflect-metadata";
import {createConnection} from "typeorm";
import {AuthInformation} from "./authuser";
import { v4 as uuidv4 } from 'uuid';
import {hashSync} from 'bcrypt';

createConnection({
    type: "sqlite",
    database: "cursus",
    entities: [
        AuthInformation
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    // here you can start to work with your entities
    const auth = AuthInformation.newUser("jp@fun.com", "myPassword")
    const authSaved = await connection.manager.save(auth)
    const getAuth = await connection.manager.find(AuthInformation, {id: auth.id})
    getAuth[0].newPassword("googoo")
    const savedAuth = await connection.manager.save(getAuth)

}).catch(error => console.log(error));
