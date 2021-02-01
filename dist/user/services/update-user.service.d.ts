import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserUpdateRequest } from '../requests/user-update.request';
export declare class UpdateUsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(id: number, userUpdateRequest: UserUpdateRequest): Promise<User | undefined>;
}
