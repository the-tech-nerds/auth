import { ConfigService } from '@nestjs/config';
import { User } from '../../user/entities/user.entity';
import { InsertLoginHistoryService } from '../../login-history/services/insert-login-history.service';
import { UpdateUsersService } from '../../user/services/update-user.service';
export declare class UserVerifyActionService {
    private readonly insertLoginHistoryService;
    private readonly updateUsersService;
    private readonly configService;
    constructor(insertLoginHistoryService: InsertLoginHistoryService, updateUsersService: UpdateUsersService, configService: ConfigService);
    performUserFrozenCheckAction(user: User): Promise<void>;
    performFailedVerificationAction(user: User, userName: string): Promise<void>;
    performSuccessVerificationAction(user: User, userName: string): Promise<void>;
}
