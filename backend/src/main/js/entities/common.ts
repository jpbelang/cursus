import {
    PrimaryColumn,
    VersionColumn
} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import {Expose} from "class-transformer";

export class SimpleVersionedObject {

    constructor() {
        this.id = uuidv4()
        this.version = 0;
    }

    @Expose()
    @PrimaryColumn()
    id: string

    @Expose()
    @VersionColumn()
    version: number
}

export enum Gender {
    MALE="male", FEMALE = "female"
}


