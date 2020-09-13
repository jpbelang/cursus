import {Column, Entity, Index, PrimaryColumn, Unique} from "typeorm";
import {hashSync} from "bcrypt";
import {Gender, SimpleVersionedObject} from "./common";

export type UserData = {
    name: string,
    email: string,
    gender: Gender
}

@Entity()
@Unique("email", ["email"])
export class User extends SimpleVersionedObject implements UserData {

    private constructor(fields: Partial<User>) {
        super();
        Object.assign(this, fields)
    }

    static newUser(args: UserData & {password: string}): User {

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
