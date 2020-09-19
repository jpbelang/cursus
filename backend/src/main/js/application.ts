import {ConnectionOptions, EntityManager} from "typeorm";
import express from "express";
import {Application} from "express";

import {createUserResource} from "./resources/users";
import {User} from "./entities/user";
import {Teacher} from "./entities/teacher";
import {FieldOfExpertise} from "./entities/fieldofexpertise";
import {Course} from "./entities/course";
import {ClassInstance} from "./entities/classinstance";
import {Room} from "./entities/room";
import bodyParser from "body-parser";


export function createApplication(entityManager: EntityManager): Application {
    const app = express();
    app.use(bodyParser.json());
    app.use("/users", createUserResource(entityManager))
    return app;
}

export function createConnectionOptions(database: string = "cursus2.db"): ConnectionOptions {
    return {
        type: "sqlite",
        database: database,
        entities: [
            User, Teacher, FieldOfExpertise, Course, ClassInstance, Room
        ],
        synchronize: true,
        logging: false
    };
}
