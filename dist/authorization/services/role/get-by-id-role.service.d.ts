import { Repository } from 'typeorm';
import { Roles } from '../../entities/role.entity';
import { PermissionCategories } from '../../entities/permission-category.entity';
export declare class GetByIdRoleService {
    private roleRepository;
    private permissionCategoriesRepository;
    constructor(roleRepository: Repository<Roles>, permissionCategoriesRepository: Repository<PermissionCategories>);
    getById(id: number): Promise<Roles | undefined>;
    getRoleDetailsById(id: number): Promise<any | undefined>;
}
