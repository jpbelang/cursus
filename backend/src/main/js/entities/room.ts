import {Column, Entity, Index, ManyToOne, PrimaryColumn} from "typeorm";
import {SimpleVersionedObject} from "./common";
import {Class} from "./class";

@Entity()
export class Room extends SimpleVersionedObject {

    private constructor(fields: Partial<Room>) {
        super();
        Object.assign(this, fields)
    }

    @PrimaryColumn()
    id: string

    @Column()
    @Index()
    address: string

    @ManyToOne("Class", "room")
    classes: Class[]
}
