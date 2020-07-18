import {Column, Entity, Index, PrimaryColumn, Unique, VersionColumn} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import {hashSync} from "bcrypt";

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

@Entity()
@Unique("email", ["email"])
export class AuthInformation extends SimpleVersionedObject {
    constructor(email: string, saltedPassword: string) {
        super();
        this.email = email
        this.saltedPassword = saltedPassword
    }

    static newUser(email: string, password: string): AuthInformation {

        return new AuthInformation(email, hashSync(password, 15))
    }

    @PrimaryColumn()
    id: string
    @Column()
    @Index()
    email: string

    @Column()
    saltedPassword: string

    newPassword(password: string) {

        this.saltedPassword = hashSync(password, 15)
    }
}