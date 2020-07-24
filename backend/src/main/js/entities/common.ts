import {
    PrimaryColumn,
    VersionColumn
} from "typeorm";
import {v4 as uuidv4} from 'uuid';

export class SimpleVersionedObject {

    constructor() {
        this.id = uuidv4()
        this.version = 0;
    }

    @PrimaryColumn()
    id: string
    @VersionColumn()
    version: number
}

export enum Gender {
    MALE="male", FEMALE = "female"
}


