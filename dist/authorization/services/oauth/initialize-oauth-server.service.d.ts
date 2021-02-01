import { AuthorizationService } from '../authorization.service';
import { SerializeClientService } from './serialize-client.service';
import { DeserializeClientService } from './deserialize-client.service';
import { GrantService } from './grant.service';
import { ExchangeService } from './exchange.service';
export declare class InitializeOauthServerService extends AuthorizationService {
    private readonly serializeClientService;
    private readonly deserializeCLientService;
    private readonly grantService;
    private readonly exchangeService;
    private readonly server;
    constructor(serializeClientService: SerializeClientService, deserializeCLientService: DeserializeClientService, grantService: GrantService, exchangeService: ExchangeService);
    initialize(): Promise<any>;
}
