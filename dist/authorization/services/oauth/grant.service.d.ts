import { Repository } from 'typeorm';
import { AuthorizationService } from '../authorization.service';
import { AccessCode } from '../../entities/access-code.entity';
export declare class GrantService extends AuthorizationService {
    private readonly accessCodeRepository;
    constructor(accessCodeRepository: Repository<AccessCode>);
    execute(server: any): Promise<void>;
}
