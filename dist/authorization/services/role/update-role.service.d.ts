import { Repository } from 'typeorm';
import { CacheService } from '@the-tech-nerds/common-services';
import { Roles } from '../../entities/role.entity';
import { Permissions } from '../../entities/permission.entity';
import { RoleRequest } from '../../requests/role.request';
export declare class UpdateRoleService {
    private roleRepository;
    private permissionRepository;
    private readonly cacheService;
    constructor(roleRepository: Repository<Roles>, permissionRepository: Repository<Permissions>, cacheService: CacheService);
    update(id: number, roleRequest: RoleRequest): Promise<Roles | undefined | void>;
    changeStatus(id: number): Promise<Roles | undefined | void>;
    private removeTokenFromRedis;
}
