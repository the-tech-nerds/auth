import { Repository } from 'typeorm';
import { ForgetPasswordCompleteRequest } from '../requests/forget-password-complete.request';
import { User } from '../../user/entities/user.entity';
import { UserResponse } from '../../user/response/user.response';
export declare class ForgetPasswordCompleteService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    execute(forgetPasswordRequest: ForgetPasswordCompleteRequest, type: number): Promise<UserResponse>;
}
