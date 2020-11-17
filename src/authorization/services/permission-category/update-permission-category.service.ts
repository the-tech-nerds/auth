import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionCategoryModel } from 'src/authorization/authorization';
import { PermissionCategories } from 'src/authorization/entities/permission-category.entity';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class UpdatePermissionCategoryService extends AuthorizationService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
  ) {
    super();
  }

  async update(
    id: number,
    permissionCategoryModel: PermissionCategoryModel,
  ): Promise<PermissionCategories | undefined> {
    await this.permissionCategoryRepository.update(id, {
      ...permissionCategoryModel, // \n
      updatedBy: 1,
    });
    return this.permissionCategoryRepository.findOne(id);
  }
}
