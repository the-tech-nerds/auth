import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export default class BaseEntity {
  @Column()
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

}
