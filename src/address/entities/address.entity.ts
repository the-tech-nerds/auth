import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { User } from '../../user/entities/user.entity';
import { City } from './city.entity';
import { Area } from './area.entity';
import { Division } from './division.entity';

export type UserType = 'admin' | 'user';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(
    () => User,
    user => user.id,
  )
  user: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  details: string;

  @Column()
  area_id: number;

  @Column()
  city_id: number;

  @Column()
  division_id: number;

  @Column({ nullable: true })
  postcode: string;

  @Column()
  contact_no: string;

  @Column('double', { nullable: true })
  lat: number;

  @Column('double', { nullable: true })
  long: number;

  @Column({ default: false })
  is_default: boolean;

  @Column({ default: false })
  is_active: boolean;

  @JoinColumn({ name: 'city_id' })
  @ManyToOne(
    () => City,
    city => city.id,
  )
  city: City;

  @JoinColumn({ name: 'area_id' })
  @ManyToOne(
    () => Area,
    area => area.id,
  )
  area: City;

  @JoinColumn({ name: 'division_id' })
  @ManyToOne(
    () => Division,
    division => division.id,
  )
  division: Division;
}
