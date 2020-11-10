import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Permissions } from 'src/authorization/authorization.entity';
import { GetByIdPermissionService } from './getById-permission.service';

@Injectable()
export class DeletePermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
    private getByIdPermissionService: GetByIdPermissionService
  ) {
  }

 async delete(id: number): Promise<UpdateResult> {
     let permission = this.getByIdPermissionService.getById(id);
    return  this.permissionRepository.update(id, {
        ...permission, 
        isActive: false
       }
    );
}
}