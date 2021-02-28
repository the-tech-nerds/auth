import { JwtService } from '@nestjs/jwt';
import { CacheService } from '@the-tech-nerds/common-services';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserRegistrationService } from './user.registration.service';
import { FetchUserByIdService } from '../../user/services/fetch-user-by-id.service';
import { FetchUserInfoByEmailService } from '../../user/services/fetch-user-by-email.service';
export declare class UserLoginService {
    private readonly jwtService;
    private readonly fetchUserByIdService;
    private readonly cacheService;
    private readonly userRegistrationService;
    private readonly fetchUserInfoByEmailService;
    private userRepository;
    constructor(jwtService: JwtService, fetchUserByIdService: FetchUserByIdService, cacheService: CacheService, userRegistrationService: UserRegistrationService, fetchUserInfoByEmailService: FetchUserInfoByEmailService, userRepository: Repository<User>);
    login(user: Partial<User>, userType: number): Promise<{
        id: number | undefined;
        access_token: string;
        code: number;
    }>;
    loginByGoogle(user: any): Promise<{
        access_token: string;
        code: number;
    }>;
    loginByFacebook(user: any): Promise<{
        access_token: string;
        code: number;
    }>;
}
