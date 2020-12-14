import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/role.entity';
import { PermissionCategories } from '../../entities/permission-category.entity';

export class GetByIdRoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
    @InjectRepository(PermissionCategories)
    private permissionCategoriesRepository: Repository<PermissionCategories>,
  ) {}

  async getById(id: number): Promise<Roles | undefined> {
    return this.roleRepository.findOne(id, {
      relations: ['permissions'],
    });
  }

  async getRoleDetailsById(id: number): Promise<any | undefined> {
    const role = await this.roleRepository.findOne(id, {
      relations: ['permissions'],
      where: {
        is_active: true,
      },
    });
    let permissionCategory = await this.permissionCategoriesRepository.find({
      where: {
        is_active: true,
      },
    });
    permissionCategory = permissionCategory
      .map(pc => {
        pc.permissions = pc.permissions.filter(
          permission =>
            role?.permissions.filter(p => permission.id === p.id) || [],
        );
        return pc;
      })
      .filter(pc => pc.permissions.length > 0);
    return {
      role: {
        // @ts-ignore
        name: role.name,
        // @ts-ignore
        id: role.id,
        permission_category: permissionCategory,
      },
    };
  }
}
