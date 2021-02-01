import BaseEntity from '../../utils/entities/base-entity';
export declare class AccessToken extends BaseEntity {
    id: string;
    value: string;
    user_id: number;
    client_id: string;
}
