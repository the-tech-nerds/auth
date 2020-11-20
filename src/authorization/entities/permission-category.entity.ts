import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Permissions } from './permission.entity';

@Entity()
@Unique(['name'])
export class PermissionCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(
    () => Permissions,
    permission => permission.permission_category_id,
  )
  permissions: Permissions[];
}
