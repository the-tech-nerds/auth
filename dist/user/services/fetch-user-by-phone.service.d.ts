import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class FetchUserInfoByPhoneService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(phone: string, type: number): Promise<Boolean | undefined>;
}
