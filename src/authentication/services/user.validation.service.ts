import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { LoginHistoryRequest } from '../../login-history/requests/login-history.request';
import {
  addMinutes,
  CurrentDate,
  LocalDateToUtc,
} from '../../utils/date-time-conversion/date-time-conversion';

export class UserValidationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) // private readonly insertLoginHistoryService: InsertLoginHistoryService,
  {}

  async validate(userName: string, password: string, type: number) {
    const user = await this.userRepository.findOne({
      where: [
        { email: userName, type },
        { phone: userName, type },
      ],
    });

    if (!user) {
      throw new BadRequestException(`User with email ${userName} not found`);
    }

    if (user.is_frozen) {
      const currentDate = CurrentDate('YYYY-MM-DD HH:mm:ss');
      if (currentDate >= user.unfreeze_at.toDateString())
        user.is_frozen = false;
      // Save user
      else
        throw new BadRequestException(
          'Sorry! your account is temporarily blocked. Try again later.',
        );
    }

    const { password: hashedPassword, ...result } = user;

    const verify = await compare(password, hashedPassword);

    if (!verify) {
      const isEmail = userName.includes('@');

      const loginHistoryData = new LoginHistoryRequest();
      loginHistoryData.phone = isEmail ? null : userName;
      loginHistoryData.email = isEmail ? userName : null;
      loginHistoryData.request_source = 1; // TODO check request source
      loginHistoryData.status = false;

      // this.insertLoginHistoryService.execute(loginHistoryData);

      await this.setUserForFailedVerification(user);

      throw new BadRequestException('Password did not match');
    }

    await this.setUserForSuccessVerification(user);

    return result;
  }

  private async setUserForFailedVerification(user: User): Promise<void> {
    user.failed_login_count += 1;
    if (user.failed_login_count > 4) {
      user.is_frozen = true;
      user.unfreeze_at = LocalDateToUtc(addMinutes(new Date(), 10));
    }
    await this.userRepository.save(user);
  }

  private async setUserForSuccessVerification(user: User): Promise<void> {
    user.failed_login_count = 0;
    user.unfreeze_at = new Date();
    await this.userRepository.save(user);
  }
}
