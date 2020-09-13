import "reflect-metadata";
import {createConnection, getManager} from "typeorm";
import {Request, Response} from "express";

import express from "express";

import * as bodyParser from "body-parser";
import {User} from "./entities/user";
import {Teacher} from "./entities/teacher";
import {FieldOfExpertise} from "./entities/fieldofexpertise";
import {Course} from "./entities/course";
import {ClassInstance} from "./entities/classinstance";
import {Room} from "./entities/room";
import {createUserResource} from "./resources/users";


createConnection({
    type: "sqlite",
    database: "cursus2.db",
    entities: [
        User, Teacher, FieldOfExpertise, Course, ClassInstance, Room
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    // here you can start to work with your entities
   // const auth = User.newUser({email: "jp@fun.com", password: "myPassword", name: "JP B", gender: Gender.MALE})
   // const authSaved = await connection.manager.save(auth)
   // console.log(authSaved)

    const app = express();
    app.use(bodyParser.json());

    app.use("/users", createUserResource(connection.createEntityManager()))

    // run app
    app.listen(3000);

    console.log("Express application is up and running on port 3000");

}).catch(error => console.log(error));
