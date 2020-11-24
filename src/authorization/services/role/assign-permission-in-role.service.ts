import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { Roles } from '../../entities/role.entity';
import { Permissions } from '../../entities/permission.entity';

@Injectable()
export class AssignPermissionInRoleService extends AuthorizationService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(Permissions)
    private permissionsRepository: Repository<Permissions>,
  ) {
    super();
  }

  async assign(
    role_id: number,
    permissions: number[],
  ): Promise<{ role: Roles | undefined } | null> {
    try {
      const ROLE = await this.rolesRepository.findOne(role_id);
      // @ts-ignore
      ROLE?.permissions = (await this.permissionsRepository.findByIds(permissions)) || [];
      // @ts-ignore
      return { role: await this.rolesRepository.save(ROLE) };
    } catch (e) {
      return null;
    }
  }
}
