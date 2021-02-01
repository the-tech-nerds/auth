import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AccessCode } from '../../entities/access-code.entity';
import { AccessToken } from '../../entities/access-token.entity';
import { AuthorizationService } from '../authorization.service';
export declare class ExchangeService extends AuthorizationService {
    private accessCodeRepository;
    private accessTokenRepository;
    private jwtService;
    constructor(accessCodeRepository: Repository<AccessCode>, accessTokenRepository: Repository<AccessToken>, jwtService: JwtService);
    execute(server: any): Promise<any>;
}
