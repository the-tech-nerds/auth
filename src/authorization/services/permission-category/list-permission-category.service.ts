import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionCategories } from 'src/authorization/entities/permission-category.entity';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { GetByIdRoleService } from '../role/get-by-id-role.service';

@Injectable()
export class ListPermissionCategoryService extends AuthorizationService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
    private getByIdRoleService: GetByIdRoleService,
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

  async getFromRole(roleId: number): Promise<any> {
    const role = await this.getByIdRoleService.getById(roleId);
    const permissioncategoryIds: any = {};
    const categoryList: any = {};
    role?.permissions?.forEach(permission => {
      if (permissioncategoryIds[permission.permission_category.name]) {
        categoryList[permission.permission_category.name].push({
          permission_id: permission.id,
          permission_name: permission.name,
        });
      } else {
        permissioncategoryIds[permission.permission_category.name] = true;
        categoryList[permission.permission_category.name] = [];
        categoryList[permission.permission_category.name].push({
          permission_id: permission.id,
          permission_name: permission.name,
        });
      }
    });
    return {
      role_name: role?.name,
      permission_category: categoryList,
    };
  }
}
