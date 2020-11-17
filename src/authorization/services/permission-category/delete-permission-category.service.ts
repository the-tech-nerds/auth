import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { PermissionCategories } from '../../entities/permission-category.entity';

@Injectable()
export class DeletePermissionCategoryService extends AuthorizationService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
  ) {
    super();
  }

  async delete(id: number) {
    return this.permissionCategoryRepository.softDelete(id);
  }
}
