import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { PermissionCategories } from '../../entities/permission-category.entity';
import { PermissionCategoryRequest } from '../../requests/permission-category.request';

@Injectable()
export class CreatePermissionCategoryService extends AuthorizationService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
  ) {
    super();
  }

  async create(
    permissionCategoryRequest: PermissionCategoryRequest,
  ): Promise<PermissionCategories> {
    return this.permissionCategoryRepository.save({
      ...permissionCategoryRequest,
      created_by: 1,
    });
  }
}
