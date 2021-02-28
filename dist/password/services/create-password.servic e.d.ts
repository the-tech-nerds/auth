import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CreatePasswordRequest } from '../requests/create-password.request';
export declare class CreatePasswordService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    execute(createPasswordRequest: CreatePasswordRequest): Promise<Boolean>;
}
