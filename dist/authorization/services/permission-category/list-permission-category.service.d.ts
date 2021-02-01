import { PermissionCategories } from 'src/authorization/entities/permission-category.entity';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { GetByIdRoleService } from '../role/get-by-id-role.service';
export declare class ListPermissionCategoryService extends AuthorizationService {
    private permissionCategoryRepository;
    private getByIdRoleService;
    constructor(permissionCategoryRepository: Repository<PermissionCategories>, getByIdRoleService: GetByIdRoleService);
    getAll(): Promise<PermissionCategories[]>;
    getFromRole(roleId: number): Promise<any>;
}
