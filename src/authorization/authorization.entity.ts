import BaseEntity from 'src/share/entities/base-entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// add role & permission related entities

@Entity()
export class PermissionCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => Permissions,
    (permission) => permission,
  )
  permissions: Permissions[];
}

@Entity()
export class Permissions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  permissionCategoryId: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(
    () => PermissionCategories,
    (perCategory) => perCategory,
  )
  @JoinColumn({ name: 'permissionCategoryId' })
  permissionCatagories: PermissionCategories;
}

@Entity()
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity()
export class RoleHasPermissions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId: number;

  @Column()
  permissionId: number;

  @OneToOne(
    () => Permissions,
    (permission) => permission,
  )
  permission: Permissions;

  @OneToOne(
    () => Roles,
    (role) => role,
  )
  role: Roles;
}

@Entity()
export class UserHasRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;

  @OneToOne(
    () => User,
    (user) => user,
  )
  user: User;

  @OneToOne(
    () => Roles,
    (role) => role,
  )
  role: Roles;
}
