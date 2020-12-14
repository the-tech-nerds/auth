import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { PermissionCategories } from './permission-category.entity';
import { Roles } from './role.entity';

@Entity()
@Unique(['name'])
export class Permissions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @JoinColumn()
  @ManyToOne(
    () => PermissionCategories,
    category => category.permissions,
  )
  permission_category: PermissionCategories;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(
    () => Roles,
    roles => roles.permissions,
    { cascade: true },
  )
  roles: Roles[];
}
