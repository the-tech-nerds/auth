import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { Permissions } from '../../entities/permission.entity';
import { PermissionRequest } from '../../requests/permission.request';

@Injectable()
export class CreatePermissionService extends AuthorizationService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {
    super();
  }

  async create(permissionRequest: PermissionRequest): Promise<Permissions> {
    return this.permissionRepository.save({
      ...permissionRequest,
      createdBy: 1,
    });
  }
}
