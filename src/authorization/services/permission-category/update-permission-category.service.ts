import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { PermissionCategories } from '../../entities/permission-category.entity';
import { PermissionCategoryRequest } from '../../requests/permission-category.request';

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
    permissionCategoryRequest: PermissionCategoryRequest,
  ): Promise<PermissionCategories | undefined> {
    await this.permissionCategoryRepository.update(id, {
      ...permissionCategoryRequest,
      updated_by: 1,
    });
    return this.permissionCategoryRepository.findOne(id);
  }
}
