export declare class UserRegistrationRequest {
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    password: string;
    google_auth?: string;
    image_url?: string;
    facebook_auth?: string;
    facebook_user_id?: string;
    is_email_verified?: boolean;
    is_mobile_verified?: boolean;
    is_used_promotion?: boolean;
    type?: number;
}
