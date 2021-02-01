import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { PermissionCategories } from '../../entities/permission-category.entity';
import { PermissionCategoryRequest } from '../../requests/permission-category.request';
export declare class CreatePermissionCategoryService extends AuthorizationService {
    private permissionCategoryRepository;
    constructor(permissionCategoryRepository: Repository<PermissionCategories>);
    create(permissionCategoryRequest: PermissionCategoryRequest): Promise<PermissionCategories>;
}
