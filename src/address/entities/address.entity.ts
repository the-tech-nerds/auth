import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { User } from '../../user/entities/user.entity';

export type UserType = 'admin' | 'user';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(
    () => User,
    user => user.addresses,
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
  postcode: number;

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
}
