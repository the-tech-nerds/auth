import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Permissions } from './permission.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@Unique(['name'])
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(
    type => Permissions,
    permissions => permissions.roles,
  )
  @JoinTable({ name: 'role_has_permissions' })
  permissions!: Permissions[];

  @ManyToMany(
    type => User,
    users => users.roles,
  )
  @JoinTable({ name: 'user_has_roles' })
  users!: User[];
}
