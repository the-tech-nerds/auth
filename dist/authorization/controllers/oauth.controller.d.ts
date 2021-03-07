import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Response } from 'express';
import { CreateClientService } from '../services/oauth/create-client.service';
import { AuthorizeService } from '../services/oauth/authorize.service';
import { TokenService } from '../services/oauth/token.service';
import { ClientRequest } from '../requests/client.request';
import { TokenRequest } from '../requests/token.request';
export declare class OauthController {
    private readonly apiResponseService;
    private readonly createClientService;
    private readonly authorizeService;
    private readonly tokenService;
    constructor(apiResponseService: ApiResponseService, createClientService: CreateClientService, authorizeService: AuthorizeService, tokenService: TokenService);
    createClient(clientRequest: ClientRequest, res: Response): Promise<Response<ResponseModel>>;
    authorization(req: any, res: any, next: any): Promise<any>;
    getToken(req: any, res: any): Promise<any>;
    authorizationToken(tokenRequest: TokenRequest, req: any, res: any, next: any): Promise<any>;
}
