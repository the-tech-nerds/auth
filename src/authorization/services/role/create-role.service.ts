import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { Roles } from '../../entities/role.entity';
import { RoleRequest } from '../../../authentication/requests/role.request';

@Injectable()
export class CreateRoleService extends AuthorizationService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {
    super();
  }

  async create(roleRequest: RoleRequest): Promise<Roles> {
    return this.rolesRepository.save(roleRequest);
  }
}
