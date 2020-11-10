import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from 'src/authorization/authorization.entity';
import { PermissionsModel } from 'src/authorization/authorization';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class CreateRoleService extends AuthorizationService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {
    super();
  }

  async create(permissionModel: PermissionsModel): Promise<Permissions> {
    return await this.permissionRepository.save(permissionModel);
  }
}
