<<<<<<< HEAD
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
=======
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
>>>>>>> 861504fdaff6c7f82b3f761411f7d2a29dcb6cd4
import BaseEntity from '../../utils/entities/base-entity';
import { Address } from '../../address/entities/address.entity';
import { Roles } from '../../authorization/entities/role.entity';

export type UserType = 'admin' | 'user';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    length: 100,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  facebook_auth: string;

  @Column({ nullable: true })
  google_auth: string;

  @Column({ nullable: true })
  image_url: string;

  //   @Column({
  //     type: "enum",
  //     enum: ["admin", "user"],
  //     default: "user"
  // })
  // type: userType;

  @Column({ default: 'user' })
  type: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(
    () => Address,
    address => address.user_id,
  )
  addresses!: Address[];

  @ManyToMany(
    () => Roles,
    roles => roles.users,
  )
  roles!: Roles[];
}
