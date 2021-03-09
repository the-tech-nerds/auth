import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { Roles } from '../../entities/role.entity';
import { RoleRequest } from '../../requests/role.request';
import { AssignPermissionInRoleService } from './assign-permission-in-role.service';

@Injectable()
export class CreateRoleService extends AuthorizationService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    private assignPermissionInRoleService: AssignPermissionInRoleService,
  ) {
    super();
  }

  async create(roleRequest: RoleRequest): Promise<Roles> {
    const role = await this.rolesRepository.save({
      ...roleRequest,
      created_by: 1,
    });
    if (roleRequest.permissions.length) {
      await this.assignPermissionInRoleService.assign(
        role.id,
        roleRequest.permissions,
      );
    }
    return role;
  }
}
