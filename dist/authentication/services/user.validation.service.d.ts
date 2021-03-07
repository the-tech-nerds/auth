import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserVerifyActionService } from './user.verify-action.service';
export declare class UserValidationService {
    private readonly userRepository;
    private readonly userVerifyActionService;
    private readonly configService;
    constructor(userRepository: Repository<User>, userVerifyActionService: UserVerifyActionService, configService: ConfigService);
    validate(userName: string, password: string, type: number): Promise<{
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        gender_type: number;
        birthday: Date;
        facebook_auth: string;
        facebook_user_id: string;
        google_auth: string;
        image_url: string;
        type: import("../../user/entities/user.entity").UserType;
        is_active: boolean;
        is_frozen: boolean;
        is_mobile_verified: boolean;
        is_email_verified: boolean;
        is_used_promotion: boolean;
        failed_login_count: number;
        last_login_at: Date;
        unfreeze_at: Date;
        addresses: import("../../address/entities/address.entity").Address[];
        roles: import("../../authorization/entities/role.entity").Roles[];
        created_by: number;
        updated_by: number;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date;
    }>;
}
