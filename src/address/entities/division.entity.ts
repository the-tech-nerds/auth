import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';

@Entity()
export class Division {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => City,
    city => city.division_id,
  )
  cities!: City[];
}
