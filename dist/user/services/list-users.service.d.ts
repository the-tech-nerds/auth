import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class ListUsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(userType: string): Promise<User[]>;
}
