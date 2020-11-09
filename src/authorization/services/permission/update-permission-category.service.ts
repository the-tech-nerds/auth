import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PermissionCategories } from 'src/authorization/authorization.entity';
import { PermissionCategoryModel } from 'src/authorization/authorization';
import { LocalDateToUtc } from 'src/share/date-time-conversion/date-time-conversion';


@Injectable()
export class UpdatePermissionCategoryService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
  ) {
  }

 async update(id:number,permissionCategoryModel:PermissionCategoryModel ) : Promise<UpdateResult> {
     permissionCategoryModel.updatedAt = LocalDateToUtc(new Date());
     permissionCategoryModel.updatedBy = 1;
     return await this.permissionCategoryRepository.update(id,permissionCategoryModel);
}
}