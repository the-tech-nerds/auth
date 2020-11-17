import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permission.entity';
import { PermissionRequest } from '../../requests/permission.request';

@Injectable()
export class UpdatePermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {}

  async update(
    id: number,
    permissionRequest: PermissionRequest,
  ): Promise<Permissions | undefined> {
    await this.permissionRepository.update(id, {
      ...permissionRequest,
      updatedBy: 1,
    });
    return this.permissionRepository.findOne(id);
  }
}
