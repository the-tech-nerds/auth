import { EntityRepository, Repository } from 'typeorm';
import { PermissionCategories } from '../entities/permission-category.entity';

@EntityRepository(PermissionCategories)
export class PermissionCategoryRepository extends Repository<
PermissionCategories
> {}
