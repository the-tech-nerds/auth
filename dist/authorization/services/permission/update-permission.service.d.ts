import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permission.entity';
import { PermissionRequest } from '../../requests/permission.request';
export declare class UpdatePermissionService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permissions>);
    update(id: number, permissionRequest: PermissionRequest): Promise<Permissions | undefined>;
}
