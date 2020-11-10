import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from 'src/authorization/authorization.entity';
import { PermissionsModel } from 'src/authorization/authorization';
import { LocalDateToUtc } from 'src/share/date-time-conversion/date-time-conversion';

@Injectable()
export class CreatePermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {
  }

 async create(permissionModel: PermissionsModel):Promise<Permissions> {
    return  this.permissionRepository.save({
     ...permissionModel,
     createdBy: 1,
     createdAt: LocalDateToUtc(new Date())
    });
}
}