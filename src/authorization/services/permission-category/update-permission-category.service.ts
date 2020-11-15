import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionCategories } from 'src/authorization/authorization.entity';
import { PermissionCategoryModel } from 'src/authorization/authorization';
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
      ...permissionCategoryModel,
      updatedBy: 1,
    });
    return this.permissionCategoryRepository.findOne(id);
  }
}
