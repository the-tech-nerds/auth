import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

@Entity()
@Unique(['name'])
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
