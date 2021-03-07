import { Repository } from 'typeorm';
import { EmailNotification } from '@the-tech-nerds/common-services';
import { User } from '../../user/entities/user.entity';
import { UserRegistrationRequest } from '../requests/user.registration.request';
export declare class UserRegistrationService {
    private readonly userRepository;
    private readonly emailNotification;
    constructor(userRepository: Repository<User>, emailNotification: EmailNotification);
    register(userData: UserRegistrationRequest): Promise<{
        first_name: string;
        last_name: string;
        email: string;
        image_url: string;
        id: number;
        phone: string;
    }>;
}
