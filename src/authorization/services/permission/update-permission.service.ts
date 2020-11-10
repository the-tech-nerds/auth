import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from 'src/authorization/authorization.entity';
import { PermissionsModel } from 'src/authorization/authorization';
import { LocalDateToUtc } from 'src/share/date-time-conversion/date-time-conversion';


@Injectable()
export class UpdatePermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {
  }

 async update(id:number,permissionModel:PermissionsModel ) : Promise<PermissionsModel> {
     await this.permissionRepository.update(id,
      {...permissionModel,
        updatedBy: 1,
        updatedAt : LocalDateToUtc(new Date())
      });
     return permissionModel;
}
}