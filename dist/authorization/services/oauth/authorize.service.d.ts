import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { Client } from '../../entities/client.entity';
import { InitializeOauthServerService } from './initialize-oauth-server.service';
export declare class AuthorizeService extends AuthorizationService {
    private readonly initializeOauthServerService;
    private readonly clientRepository;
    constructor(initializeOauthServerService: InitializeOauthServerService, clientRepository: Repository<Client>);
    authorize(): Promise<any>;
}
