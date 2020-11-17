import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

@Entity()
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
