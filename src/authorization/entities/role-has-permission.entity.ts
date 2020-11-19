import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Permissions } from './permission.entity';
import { Roles } from './role.entity';

@Entity()
export class RoleHasPermissions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId: number;

  @Column()
  permission_id: number;

  @OneToOne(
    () => Permissions,
    permission => permission,
  )
  permission: Permissions;

  @OneToOne(
    () => Roles,
    role => role,
  )
  role: Roles;
}
