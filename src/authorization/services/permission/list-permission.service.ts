import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permission.entity';

@Injectable()
export class ListPermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {}

  async getAll(): Promise<Permissions[]> {
    return this.permissionRepository.find({
      where: {
        isActive: true,
        deleteAt: null,
      },
    });
  }
}
