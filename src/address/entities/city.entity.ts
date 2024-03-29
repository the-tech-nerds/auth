import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';
import { Division } from './division.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  division_id: number;

  @JoinColumn({ name: 'division_id' })
  @ManyToOne(
    () => Division,
    division => division.id,
  )
  division: Division;

  @OneToMany(
    () => Area,
    area => area.city_id,
  )
  areas!: Area[];
}
