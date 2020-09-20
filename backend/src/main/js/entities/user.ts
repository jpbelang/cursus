import {Column, Entity, Index, PrimaryColumn, Unique} from "typeorm";
import {hashSync} from "bcrypt";
import {Gender, SimpleVersionedObject} from "./common";
import {Expose, plainToClass} from "class-transformer";
import {v4} from "uuid";

export type UserData = {
    name: string,
    email: string,
    gender: Gender
}

@Entity()
@Unique("email", ["email"])
export class User extends SimpleVersionedObject implements UserData {


    static newUser(args: UserData & {password: string}): User {

        const data : UserData & {password: string}  = Object.assign({}, args)
        const val = plainToClass(User, data, {
            excludeExtraneousValues: true
        } )
        val.id = v4()
        val.saltedPassword = hashSync(args.password, 15)
        return val
    }

    @Expose()
    @Column()
    @Index()
    email: string

    @Expose()
    @Column()
    name: string

    @Expose()
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
