import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionCategories } from 'src/authorization/entities/permission-category.entity';
import { PermissionCategoryRequest } from 'src/authorization/requests/permission-category.request';
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
    permissionCategoryRequest: PermissionCategoryRequest,
  ): Promise<PermissionCategories | undefined> {
    await this.permissionCategoryRepository.update(id, {
      ...permissionCategoryRequest,
      updatedBy: 1,
    });
    return this.permissionCategoryRepository.findOne(id);
  }
}
