import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionCategories } from 'src/authorization/authorization.entity';

@Injectable()
export class GetByIdPermissionCategoryService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
  ) {
  }

 async getById(id: number): Promise<PermissionCategories | undefined> {
    return  this.permissionCategoryRepository.findOne(id);
}
}