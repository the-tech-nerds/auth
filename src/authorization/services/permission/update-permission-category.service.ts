import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

 async update(id:number,permissionCategoryModel:PermissionCategoryModel ) : Promise<PermissionCategoryModel> {
     await this.permissionCategoryRepository.update(id,
      {...permissionCategoryModel,
        updatedBy: 1,
        updatedAt : LocalDateToUtc(new Date())
      });
     return permissionCategoryModel;
}
}