import { PermissionCategories } from 'src/authorization/entities/permission-category.entity';
import { PermissionCategoryRequest } from 'src/authorization/requests/permission-category.request';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
export declare class UpdatePermissionCategoryService extends AuthorizationService {
    private permissionCategoryRepository;
    constructor(permissionCategoryRepository: Repository<PermissionCategories>);
    update(id: number, permissionCategoryRequest: PermissionCategoryRequest): Promise<PermissionCategories | undefined>;
}
