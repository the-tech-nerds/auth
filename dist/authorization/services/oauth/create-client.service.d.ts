import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
import { AuthorizationService } from '../authorization.service';
import { ClientRequest } from '../../requests/client.request';
export declare class CreateClientService extends AuthorizationService {
    private clientRepository;
    constructor(clientRepository: Repository<Client>);
    create(clientRequest: ClientRequest): Promise<Client>;
}
