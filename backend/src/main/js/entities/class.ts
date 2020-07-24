import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {SimpleVersionedObject} from "common";
import {Room} from "./room";


type ClassData = {
    room: Room,
    date: string
    size: number
}

@Entity()
export class Class extends SimpleVersionedObject implements ClassData {

    private constructor(fields: Partial<Class>) {
        super();
        Object.assign(this, fields)
    }

    @PrimaryColumn()
    id: string

    @OneToMany(() => Room, "classes")
    room: Room

    @Column("datetime")
    date: string

    @Column()
    size: number
}
