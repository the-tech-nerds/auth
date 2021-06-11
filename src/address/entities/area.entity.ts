import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city_id: number;

  @JoinColumn({ name: 'city_id' })
  @ManyToOne(
    () => City,
    city => city.id,
  )
  city: City;
}
