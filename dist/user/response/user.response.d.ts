export declare class UserResponse {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    image_url: string;
    gender_type?: number;
    is_mobile_verified?: boolean;
    is_email_verified?: boolean;
    has_password?: boolean;
    is_facebook_login?: boolean;
    is_gmail_login?: boolean;
    birthday?: Date;
    roles?: any[];
}
