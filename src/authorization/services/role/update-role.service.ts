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
  ): Promise<Roles | undefined | void> {
    try {
      const role = await this.roleRepository.findOneOrFail(id);
      role.name = roleRequest.name;
      role.updated_by = 1;
      role.permissions = await this.permissionRepository.findByIds(
        roleRequest.permissions,
      );
      console.log(await this.roleRepository.save(role));
      // return await this.roleRepository.save(role);
    } catch (e) {
      console.log(e);
    }
  }
}
