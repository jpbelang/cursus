import {Column, Entity, Index, ManyToMany, PrimaryColumn} from "typeorm";
import {SimpleVersionedObject} from "./common";
import {FieldOfExpertise} from "./fieldofexpertise";

type CourseData = {
    name: string,
    content: string,
    expertises: FieldOfExpertise[]
}

@Entity()
export class Course extends SimpleVersionedObject implements CourseData {

    private constructor(fields: Partial<Course>) {
        super();
        Object.assign(this, fields)
    }

    @PrimaryColumn()
    id: string

    @Column()
    @Index()
    name: string

    @Column()
    content: string

    @ManyToMany("FieldOfExpertise", "courses")
    expertises: FieldOfExpertise[]
}


