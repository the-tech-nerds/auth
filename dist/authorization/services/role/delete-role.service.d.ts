import { Repository, UpdateResult } from 'typeorm';
import { Roles } from '../../entities/role.entity';
export declare class DeleteRoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Roles>);
    delete(id: number): Promise<UpdateResult>;
}
