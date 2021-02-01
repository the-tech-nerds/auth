import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { Roles } from '../../entities/role.entity';
import { RoleRequest } from '../../requests/role.request';
import { AssignPermissionInRoleService } from './assign-permission-in-role.service';
export declare class CreateRoleService extends AuthorizationService {
    private rolesRepository;
    private assignPermissionInRoleService;
    constructor(rolesRepository: Repository<Roles>, assignPermissionInRoleService: AssignPermissionInRoleService);
    create(roleRequest: RoleRequest): Promise<Roles>;
}
