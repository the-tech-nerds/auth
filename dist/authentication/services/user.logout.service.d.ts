import { CacheService } from '@the-tech-nerds/common-services';
export declare class UserLogoutService {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    logout(userId: any): Promise<void>;
}
