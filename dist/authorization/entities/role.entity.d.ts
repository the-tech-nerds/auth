import BaseEntity from '../../utils/entities/base-entity';
import { Permissions } from './permission.entity';
import { User } from '../../user/entities/user.entity';
export declare class Roles extends BaseEntity {
    id: number;
    name: string;
    is_active: boolean;
    permissions: Permissions[];
    users: User[];
}
