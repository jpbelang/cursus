import {Column, Entity, Index, ManyToOne, PrimaryColumn} from "typeorm";
import {SimpleVersionedObject} from "./common";
import {ClassInstance} from "./classinstance";

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

    @ManyToOne("ClassInstance", "room")
    classes: ClassInstance[]
}
