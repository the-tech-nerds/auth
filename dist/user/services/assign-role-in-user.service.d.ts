import { Repository } from 'typeorm';
import { CacheService } from '@the-tech-nerds/common-services';
import { AuthorizationService } from '../../authorization/services/authorization.service';
import { Roles } from '../../authorization/entities/role.entity';
import { User } from '../entities/user.entity';
export declare class AssignRolesInUserService extends AuthorizationService {
    private rolesRepository;
    private userRepository;
    private readonly cacheService;
    constructor(rolesRepository: Repository<Roles>, userRepository: Repository<User>, cacheService: CacheService);
    assign(user_id: number, roles: number[]): Promise<{
        user: User | undefined;
    } | null>;
}
