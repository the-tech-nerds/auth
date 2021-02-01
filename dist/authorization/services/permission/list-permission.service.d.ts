import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permission.entity';
import { GetByIdRoleService } from '../role/get-by-id-role.service';
import { Roles } from '../../entities/role.entity';
export declare class ListPermissionService {
    private permissionRepository;
    private roleIdService;
    constructor(permissionRepository: Repository<Permissions>, roleIdService: GetByIdRoleService);
    getAll(): Promise<Permissions[]>;
    getFromRole(roleId: number): Promise<Roles | undefined>;
}
