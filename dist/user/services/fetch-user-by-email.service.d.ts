import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class FetchUserInfoByEmailService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(email: string, type: number, onlyBoolean?: Boolean): Promise<any>;
}
