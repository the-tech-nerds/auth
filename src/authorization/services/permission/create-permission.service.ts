import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from 'src/authorization/authorization.entity';
import { PermissionModel } from 'src/authorization/authorization';
import { LocalDateToUtc } from 'src/share/date-time-conversion/date-time-conversion';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class CreatePermissionService extends AuthorizationService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {
    super();
  }

  async create(permissionModel: PermissionModel): Promise<Permissions> {
    return this.permissionRepository.save({
      ...permissionModel,
      createdBy: 1,
      createdAt: LocalDateToUtc(new Date()),
    });
  }
}
