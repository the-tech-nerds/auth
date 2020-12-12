import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionCategories } from 'src/authorization/entities/permission-category.entity';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { RoleRepository } from '../../repositories/role.repository';

@Injectable()
export class ListPermissionCategoryService extends AuthorizationService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
    private rolesRepository: RoleRepository,
  ) {
    super();
  }

  async getAll(): Promise<PermissionCategories[]> {
    // [1,2]
    return this.permissionCategoryRepository.find({
      where: {
        is_active: true,
        deleted_at: null,
      },
      relations: ['permissions'],
    });
  }

  /* async getFromRole(roleId: number): Promise<any> {
    const role = await this.rolesRepository.findOneOrFail(roleId);
    const permissioncategoryIds = {};
    const categoryList = [];
    role.permissions.forEach((permission) => {
      if(! permissioncategoryIds[permission.permission_category.id]){
        categoryList.push(permission.permission_category);
      } else {
        permissioncategoryIds[permission.permission_category.id] = true;
      }
    });
    return '';
  } */

  async getFromRole(roleId: number): Promise<number[]> {
    const role = await this.rolesRepository.findOneOrFail(roleId);
    return role.permissions.map(permission => permission.id);
  }
}
