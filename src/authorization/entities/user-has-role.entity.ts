import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { User } from '../../user/entities/user.entity';
import { Roles } from './role.entity';

@Entity()
export class UserHasRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  role_id: number;

  @OneToOne(
    () => User,
    user => user,
  )
  user: User;

  @OneToOne(
    () => Roles,
    role => role,
  )
  role: Roles;
}
