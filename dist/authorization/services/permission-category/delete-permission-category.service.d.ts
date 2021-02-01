import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { PermissionCategories } from '../../entities/permission-category.entity';
export declare class DeletePermissionCategoryService extends AuthorizationService {
    private permissionCategoryRepository;
    constructor(permissionCategoryRepository: Repository<PermissionCategories>);
    delete(id: number): Promise<import("typeorm").UpdateResult>;
}
