import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/role.entity';
import { RoleRequest } from '../../requests/role.request';

@Injectable()
export class UpdateRoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async update(
    id: number,
    roleRequest: RoleRequest,
  ): Promise<Roles | undefined> {
    await this.roleRepository.update(id, {
      ...roleRequest,
      updated_by: 1,
    });
    return this.roleRepository.findOne(id);
  }
}
