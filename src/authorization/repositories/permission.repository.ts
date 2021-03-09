import { EntityRepository, Repository } from 'typeorm';
import { Permissions } from '../entities/permission.entity';

@EntityRepository(Permissions)
export class PermissionRepository extends Repository<Permissions> {}
