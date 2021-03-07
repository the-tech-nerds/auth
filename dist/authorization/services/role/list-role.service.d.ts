import { Repository } from 'typeorm';
import { Roles } from '../../entities/role.entity';
export declare class ListRoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Roles>);
    getAll(): Promise<Roles[]>;
}
