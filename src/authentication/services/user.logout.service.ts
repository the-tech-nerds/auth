import { Injectable } from '@nestjs/common';
import { CacheService } from '@the-tech-nerds/common-services';

@Injectable()
export class UserLogoutService {
  constructor(private readonly cacheService: CacheService) {}

  async logout(userId: any) {
    await this.cacheService.delete(`user-token-${userId}`);
  }
}
