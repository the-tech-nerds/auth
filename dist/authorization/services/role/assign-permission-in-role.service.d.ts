import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { Roles } from '../../entities/role.entity';
import { Permissions } from '../../entities/permission.entity';
export declare class AssignPermissionInRoleService extends AuthorizationService {
    private rolesRepository;
    private permissionsRepository;
    constructor(rolesRepository: Repository<Roles>, permissionsRepository: Repository<Permissions>);
    assign(role_id: number, permissions: number[]): Promise<{
        role: Roles | undefined;
    } | null>;
}
