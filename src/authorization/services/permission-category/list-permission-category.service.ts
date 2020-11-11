import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionCategories } from 'src/authorization/authorization.entity';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class ListPermissionCategoryService extends AuthorizationService {
  constructor(
    @InjectRepository(PermissionCategories)
    private permissionCategoryRepository: Repository<PermissionCategories>,
  ) {
    super();
  }

 async getAll():Promise<PermissionCategories[]> {
    return  this.permissionCategoryRepository.find({
        where: { 
          isActive: true,
          deleteAt: null
        }
    });
  }
}
