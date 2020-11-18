import { EntityRepository, Repository } from 'typeorm';
import { Roles } from '../entities/role.entity';

@EntityRepository(Roles)
export class RoleRepository extends Repository<Roles> {}
