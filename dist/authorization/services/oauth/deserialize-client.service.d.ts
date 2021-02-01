import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
import { AuthorizationService } from '../authorization.service';
export declare class DeserializeClientService extends AuthorizationService {
    private readonly clientRepository;
    constructor(clientRepository: Repository<Client>);
    execute(server: any): Promise<void>;
}
