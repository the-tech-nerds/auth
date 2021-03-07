import BaseEntity from '../../utils/entities/base-entity';
import { Permissions } from './permission.entity';
export declare class PermissionCategories extends BaseEntity {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    permissions: Permissions[];
}
