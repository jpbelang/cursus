import {Column, Entity, Index, ManyToMany, PrimaryColumn} from "typeorm";
import { SimpleVersionedObject} from "./common";
import {Course} from "./course";
import {Teacher} from "./teacher";

@Entity()
export class FieldOfExpertise extends SimpleVersionedObject {

    private constructor(fields: Partial<FieldOfExpertise>) {
        super();
        Object.assign(this, fields)
    }

    @PrimaryColumn()
    id: string

    @Column()
    @Index()
    expertiseName: string

    @ManyToMany("Teacher", "expertise")
    teachers: Teacher[]

    @ManyToMany("Course", "expertise")
    courses: Course[]

}

