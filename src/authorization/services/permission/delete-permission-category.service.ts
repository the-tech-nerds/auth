import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PermissionCategories } from 'src/authorization/authorization.entity';
import { GetByIdPermissionCategoryService } from './getById-permission-category.service';

@Injectable()
export class DeletePermissionCategoryService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
    private getByIdPermissionCategoryService: GetByIdPermissionCategoryService
  ) {
  }

 async delete(id: number): Promise<UpdateResult> {
     let permissionCategory = this.getByIdPermissionCategoryService.getById(id);
    return  this.permissionCategoryRepository.update(id, {
        ...permissionCategory, 
        isActive: false
       }
    );
}
}