import {Column, Entity, Index, JoinTable, ManyToMany, PrimaryColumn, Unique} from "typeorm";
import {hashSync} from "bcrypt";
import {Gender, SimpleVersionedObject} from "./common";
import {FieldOfExpertise} from "./fieldofexpertise";
import {User} from "./user";

type TeacherData = {
    name: string,
    email: string,
    gender: Gender,
    expertise: FieldOfExpertise[]
}

@Entity()
@Unique("email", ["email"])
export class Teacher extends SimpleVersionedObject implements TeacherData {

    private constructor(fields: Partial<Teacher>) {
        super();
        Object.assign(this, fields)
    }

    static newTeacher(args: TeacherData & {password: string}): User {

        return new Teacher(Object.assign(args, {saltedPassword: hashSync(args.password, 15)}))
    }

    @PrimaryColumn()
    id: string

    @Column()
    @Index()
    email: string

    @Column()
    name: string

    @ManyToMany("FieldOfExpertise", "teachers")
    @JoinTable()
    expertise: FieldOfExpertise[];

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

