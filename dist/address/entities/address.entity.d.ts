import BaseEntity from '../../utils/entities/base-entity';
export declare type UserType = 'admin' | 'user';
export declare class Address extends BaseEntity {
    id: number;
    user_id: number;
    name: string;
    details: string;
    area_id: number;
    city_id: number;
    division_id: number;
    postcode: number;
    contact_no: string;
    lat: number;
    long: number;
    is_default: boolean;
    is_active: boolean;
}
