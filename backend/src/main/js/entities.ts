import {Column, Entity, Index, PrimaryColumn, Unique, VersionColumn} from "typeorm";
import {v4 as uuidv4} from 'uuid';
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

export enum Gender {
    MALE="male", FEMALE = "female"
}


type UserData = {
    name: string,
    email: string,
    gender: Gender,
    saltedPassword: string,
}

@Entity()
@Unique("email", ["email"])
export class User extends SimpleVersionedObject {

    constructor(fields: UserData) {
        super();
        Object.assign(this, fields)
    }

    static newUser(args: {
        name: string,
        email: string,
        gender: Gender,
        password: string,
    }): User {

        return new User(Object.assign(args, {saltedPassword: hashSync(args.password, 15)}))
    }

    @PrimaryColumn()
    id: string

    @Column()
    @Index()
    email: string

    @Column()
    name: string

    @Column({
        type: 'simple-enum',

        enum: Gender,
    })
    gender: Gender

    @Column()
    saltedPassword: string

    newPassword(password: string) {

        this.saltedPassword = hashSync(password, 15)
    }
}
