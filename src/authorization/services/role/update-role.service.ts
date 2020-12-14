import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/role.entity';
import { Permissions } from '../../entities/permission.entity';
import { RoleRequest } from '../../requests/role.request';

@Injectable()
export class UpdateRoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {}

  async update(
    id: number,
    roleRequest: RoleRequest,
  ): Promise<Roles | undefined> {
    await this.roleRepository.update(id, {
      name: roleRequest.name,
      updated_by: 1,
    });
    const role = await this.roleRepository.findOne(id);
    // @ts-ignore
    role?.permissions = await this.permissionRepository.findByIds(
      roleRequest.permissions,
    );
    // @ts-ignore
    return this.roleRepository.save(role);
  }
}
