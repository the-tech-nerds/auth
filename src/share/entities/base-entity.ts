import { Column } from "typeorm";

export default  class BaseEntity {
    @Column()
    createdBy?: number;

    @Column({nullable: true})
    updatedBy?: number;

    @Column()
    createdAt?: Date;

    @Column({nullable: true})
    updatedAt?: Date;

}