import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateEmailRequest } from '../requests/update-email.request';
export declare class UpdateEmailService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(request: UpdateEmailRequest, user_id: number): Promise<boolean>;
}
