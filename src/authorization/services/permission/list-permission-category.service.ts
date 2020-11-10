import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionCategories } from 'src/authorization/authorization.entity';

@Injectable()
export class ListPermissionCategoryService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
  ) {
  }

 async getAll():Promise<PermissionCategories[]> {
    return await this.permissionCategoryRepository.find({
        isActive: true
    });
}
}