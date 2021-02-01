import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdatePhoneRequest } from '../requests/update-phone.request';
export declare class UpdatePhoneService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(request: UpdatePhoneRequest): Promise<boolean>;
}
