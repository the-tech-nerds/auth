import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class FetchUserByIdService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(userId: number): Promise<User | undefined>;
}
