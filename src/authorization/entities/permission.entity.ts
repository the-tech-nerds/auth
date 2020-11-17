import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { PermissionCategories } from './permission-category.entity';

@Entity()
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
    (category) => category.permissions,
  )
  permission_category_id: number;

  @Column({ default: true })
  is_active: boolean;
}
