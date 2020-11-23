import {
  Column,
  Entity,
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

  @ManyToMany(
    type => Permissions,
    permissions => permissions.roles,
  )
  permissions: Permissions[];

  @ManyToMany(
    type => User,
    users => users.roles,
  )
  users: User[];
}
