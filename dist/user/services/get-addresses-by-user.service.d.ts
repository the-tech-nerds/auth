import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Address } from '../../address/entities/address.entity';
export declare class GetAddressesByUserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    execute(userId: number): Promise<Address[] | undefined>;
}
