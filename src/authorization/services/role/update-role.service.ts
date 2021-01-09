import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '@technerds/common-services';
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
    // @ts-ignore
    await this.removeTokenFromRedis(role?.users);
    return res;
  }

  private async removeTokenFromRedis(users?: []): Promise<void> {
    if (users) {
      if (users.length > 0) {
        const ids = users.map((x: any) => x.id);
        // @ts-ignore
        for (let i = 0; i < ids; i += 1) {
          await this.cacheService.delete(`user-token-${ids[i]}`);
        }
      }
    }
  }
}
