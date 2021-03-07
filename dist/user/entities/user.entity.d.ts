import BaseEntity from '../../utils/entities/base-entity';
import { Address } from '../../address/entities/address.entity';
import { Roles } from '../../authorization/entities/role.entity';
export declare enum UserType {
    ADMIN = 1,
    USER = 2
}
export declare class User extends BaseEntity {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    gender_type: number;
    birthday: Date;
    facebook_auth: string;
    facebook_user_id: string;
    google_auth: string;
    image_url: string;
    type: UserType;
    is_active: boolean;
    is_frozen: boolean;
    is_mobile_verified: boolean;
    is_email_verified: boolean;
    is_used_promotion: boolean;
    failed_login_count: number;
    last_login_at: Date;
    unfreeze_at: Date;
    addresses: Address[];
    roles: Roles[];
}
