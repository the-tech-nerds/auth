import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../user/entities/user.entity';
import {
  addMinutes,
  CurrentDate,
  LocalDateToUtc,
} from '../../utils/date-time-conversion/date-time-conversion';
import { InsertLoginHistoryService } from '../../login-history/services/insert-login-history.service';
import { LoginHistoryRequest } from '../../login-history/requests/login-history.request';
import { UpdateUsersService } from '../../user/services/update-user.service';

@Injectable()
export class UserVerifyActionService {
  constructor(
    @InjectRepository(User)
    private readonly insertLoginHistoryService: InsertLoginHistoryService,
    private readonly updateUsersService: UpdateUsersService,
    private readonly configService: ConfigService,
  ) {}

  async performUserFrozenCheckAction(user: User): Promise<void> {
    if (user.is_frozen) {
      const currentDate = CurrentDate('YYYY-MM-DD HH:mm:ss');
      if (currentDate >= user.unfreeze_at.toDateString()) {
        user.is_frozen = false;
        user.failed_login_count -= 1;
        await this.updateUsersService.execute(user.id, user);
      } else {
        throw new BadRequestException(
          'Sorry! your account is temporarily blocked. Try again later.',
        );
      }
    }
  }

  async performFailedVerificationAction(
    user: User,
    userName: string,
  ): Promise<void> {
    const loginHistoryData = {
      userName,
      request_source: user.type,
      status: false,
    } as LoginHistoryRequest;
    this.insertLoginHistoryService.execute(loginHistoryData);

    user.failed_login_count += 1;
    if (
      user.failed_login_count > this.configService.get('failed_login_limit')
    ) {
      user.is_frozen = true;
      user.unfreeze_at = LocalDateToUtc(
        addMinutes(new Date(), <number>this.configService.get('block_time')),
      );
    }
    await this.updateUsersService.execute(user.id, user);
  }

  async performSuccessVerificationAction(user: User): Promise<void> {
    user.failed_login_count = 0;
    user.unfreeze_at = new Date();
    await this.updateUsersService.execute(user.id, user);
  }
}
