import { Column } from "typeorm";

export default  class BaseEntity {
    @Column()
    createdBy: string;

    @Column({nullable: true})
    updatedBy: string;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

}