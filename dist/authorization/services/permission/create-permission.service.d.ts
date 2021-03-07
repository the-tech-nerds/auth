import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { Permissions } from '../../entities/permission.entity';
import { PermissionRequest } from '../../requests/permission.request';
export declare class CreatePermissionService extends AuthorizationService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permissions>);
    create(permissionRequest: PermissionRequest): Promise<Permissions>;
}
