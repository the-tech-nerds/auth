import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class DeleteUserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(id: number): Promise<UpdateResult>;
}
