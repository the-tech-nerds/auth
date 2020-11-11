import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionCategories } from 'src/authorization/authorization.entity';
import { PermissionCategoryModel } from 'src/authorization/authorization';
import { LocalDateToUtc } from 'src/share/date-time-conversion/date-time-conversion';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class CreatePermissionCategoryService extends AuthorizationService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
  ) {
    super();
  }

  async create(permissionCategoryModel: PermissionCategoryModel): Promise<PermissionCategories> {
    return await this.permissionCategoryRepository.save({
      ...permissionCategoryModel,
      createdAt: LocalDateToUtc(new Date()),
      createdBy: 1,
    });
  }
}
