import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permission.entity';
export declare class GetByIdPermissionService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permissions>);
    getById(id: number): Promise<Permissions | undefined>;
}
