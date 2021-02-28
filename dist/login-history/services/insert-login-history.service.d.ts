import { Repository } from 'typeorm';
import { LoginHistoryRequest } from '../requests/login-history.request';
import { LoginHistories } from '../entities/login-history.entity';
export declare class InsertLoginHistoryService {
    private loginHistoriesRepository;
    constructor(loginHistoriesRepository: Repository<LoginHistories>);
    execute(loginHistoryRequest: LoginHistoryRequest): Promise<void>;
}
