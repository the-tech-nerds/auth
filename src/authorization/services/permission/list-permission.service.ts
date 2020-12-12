import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permission.entity';
import { GetByIdRoleService } from '../role/get-by-id-role.service';

@Injectable()
export class ListPermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
    private roleIdService: GetByIdRoleService,
  ) {}

  async getAll(): Promise<Permissions[]> {
    return this.permissionRepository.find({
      where: {
        is_active: true,
        deleted_at: null,
      },
    });
  }

  async getFromRole(roleId: number): Promise<number[]> {
    const role = await this.roleIdService.getById(roleId);
    return role ? role.permissions.map(permission => permission.id) : [];
  }
}
