import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permission.entity';
import { GetByIdRoleService } from '../role/get-by-id-role.service';
import { Roles } from '../../entities/role.entity';

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

  async getFromRole(roleId: number): Promise<Roles | undefined> {
    return this.roleIdService.getById(roleId);
  }
}
