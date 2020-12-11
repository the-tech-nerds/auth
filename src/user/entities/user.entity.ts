import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
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

  @Column({
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  gender_type: number;

  @Column({ nullable: true })
  birthday: Date;

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

  @Column({ default: false })
  is_mobile_verified: boolean;

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
