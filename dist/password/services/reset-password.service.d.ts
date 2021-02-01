import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserResponse } from '../../user/response/user.response';
import { ResetPasswordRequest } from '../requests/reset-password.request';
export declare class ResetPasswordService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    execute(resetPasswordRequest: ResetPasswordRequest, user_id: number): Promise<UserResponse>;
}
