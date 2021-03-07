import { AuthorizationService } from '../authorization.service';
import { InitializeOauthServerService } from './initialize-oauth-server.service';
export declare class TokenService extends AuthorizationService {
    private readonly initializeOauthServerService;
    constructor(initializeOauthServerService: InitializeOauthServerService);
    execute(): Promise<any>;
}
