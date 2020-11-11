import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from 'src/authorization/authorization.entity';
import {  PermissionModel } from 'src/authorization/authorization';
import { LocalDateToUtc } from 'src/share/date-time-conversion/date-time-conversion';


@Injectable()
export class UpdatePermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {
  }

 async update(id:number,permissionModel:PermissionModel ) : Promise<Permissions | undefined> {
     await this.permissionRepository.update(id,
      {...permissionModel,
        updatedBy: 1,
        updatedAt : LocalDateToUtc(new Date())
      });
     return this.permissionRepository.findOne(id);
}
}
