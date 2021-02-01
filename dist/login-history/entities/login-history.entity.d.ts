import BaseEntity from '../../utils/entities/base-entity';
export declare enum RequestSource {
    ADMIN = 1,
    USER = 2
}
export declare class LoginHistories extends BaseEntity {
    id: number;
    email: string;
    phone: string;
    request_source: RequestSource;
    status: boolean;
}
