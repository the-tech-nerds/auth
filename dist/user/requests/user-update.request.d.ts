export declare class UserUpdateRequest {
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    image_url?: string;
    birthday?: Date;
    gender_type?: number;
    type?: number;
    is_frozen?: boolean;
    failed_login_count?: number;
    last_login_at?: Date;
    unfreeze_at?: Date;
}
