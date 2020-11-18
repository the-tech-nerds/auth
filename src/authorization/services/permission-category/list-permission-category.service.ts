import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionCategories } from 'src/authorization/entities/permission-category.entity';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class ListPermissionCategoryService extends AuthorizationService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
  ) {
    super();
  }

  async getAll(): Promise<PermissionCategories[]> {
    return this.permissionCategoryRepository.find({
      where: {
        is_active: true,
        deleteAt: null,
      },
    });
  }
}
