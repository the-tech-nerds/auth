import BaseEntity from '../../utils/entities/base-entity';
import { PermissionCategories } from './permission-category.entity';
import { Roles } from './role.entity';
export declare class Permissions extends BaseEntity {
    id: number;
    name: string;
    description: string;
    permission_category: PermissionCategories;
    is_active: boolean;
    roles: Roles[];
}
