import { Repository, UpdateResult } from 'typeorm';
import { Permissions } from '../../entities/permission.entity';
export declare class DeletePermissionService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permissions>);
    delete(id: number): Promise<UpdateResult>;
}
