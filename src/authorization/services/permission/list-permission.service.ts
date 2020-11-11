import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from 'src/authorization/authorization.entity';

@Injectable()
export class ListPermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {
  }

 async getAll():Promise<Permissions[]> {
    return await this.permissionRepository.find({
       where: { 
         isActive: true,
         deleteAt: null
       }
    });
}
}
