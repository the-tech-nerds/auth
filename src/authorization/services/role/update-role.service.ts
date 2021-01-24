import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '@the-tech-nerds/common-services';
import { Roles } from '../../entities/role.entity';
import { Permissions } from '../../entities/permission.entity';
import { RoleRequest } from '../../requests/role.request';
import { User } from '../../../user/entities/user.entity';

@Injectable()
export class UpdateRoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
    private readonly cacheService: CacheService,
  ) {}

  async update(
    id: number,
    roleRequest: RoleRequest,
  ): Promise<Roles | undefined | void> {
    const role = await this.roleRepository.findOneOrFail(id, {
      relations: ['users'],
    });
    role.name = roleRequest.name;
    role.updated_by = 1;
    role.permissions = await this.permissionRepository.findByIds(
      roleRequest.permissions,
    );
    const res = this.roleRepository.save(role);
    this.removeTokenFromRedis(role?.users);
    return res;
  }

  async changeStatus(id: number): Promise<Roles | undefined | void> {
    const role = await this.roleRepository.findOneOrFail(id, {
      relations: ['users'],
    });
    role.is_active = !role.is_active;
    const res = await this.roleRepository.save(role);
    this.removeTokenFromRedis(role.users);
    return res;
  }

  private removeTokenFromRedis(users?: User[]): void {
    if (!users || !users.length) return;

    users.map(({ id = null }) => this.cacheService.delete(`user-token-${id}`));
  }
}
