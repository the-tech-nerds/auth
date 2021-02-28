import { Repository } from 'typeorm';
import { AuthorizationService } from '../../authorization/services/authorization.service';
import { User } from '../entities/user.entity';
export declare class UpdateUserFreezeStatusService extends AuthorizationService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    unfreezeUser(user_id: number): Promise<User>;
}
