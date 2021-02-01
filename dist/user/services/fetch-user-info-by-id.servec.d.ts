import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserResponse } from '../response/user.response';
export declare class FetchUserInfoByIdService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(userId: number): Promise<UserResponse | undefined>;
}
