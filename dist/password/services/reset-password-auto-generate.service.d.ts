import { Repository } from 'typeorm';
import { EmailNotification } from '@the-tech-nerds/common-services';
import { User } from '../../user/entities/user.entity';
import { UserResponse } from '../../user/response/user.response';
export declare class ResetPasswordAutoGenerateService {
    private userRepository;
    private readonly emailNotification;
    constructor(userRepository: Repository<User>, emailNotification: EmailNotification);
    execute(user_id: number): Promise<UserResponse>;
}
