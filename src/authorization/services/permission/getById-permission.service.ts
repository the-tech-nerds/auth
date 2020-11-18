import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permission.entity';

@Injectable()
export class GetByIdPermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {}

  async getById(id: number): Promise<Permissions | undefined> {
    return this.permissionRepository.findOne(id);
  }
}
