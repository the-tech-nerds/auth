import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UpdatePhoneVerifiedService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(id: number): Promise<boolean>;
}
