import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Permissions } from 'src/authorization/authorization.entity';

@Injectable()
export class DeletePermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>
  ) {
  }

 async delete(id: number): Promise<UpdateResult> {
    return  this.permissionRepository.softDelete(id);
}
}
