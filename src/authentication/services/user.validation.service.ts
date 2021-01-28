import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { UserVerifyActionService } from './user.verify-action.service';

export class UserValidationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userVerifyActionService: UserVerifyActionService,
    private readonly configService: ConfigService,
  ) {}

  async validate(userName: string, password: string, type: number) {
    const user = await this.userRepository.findOne({
      where: [
        { email: userName, type },
        { phone: userName, type },
      ],
    });

    if (!user) {
      throw new BadRequestException(`User with ${userName} not found`);
    }

    await this.userVerifyActionService.performUserFrozenCheckAction(user);

    const { password: hashedPassword, ...result } = user;

    const verify = await compare(password, hashedPassword);

    if (!verify) {
      await this.userVerifyActionService.performFailedVerificationAction(
        user,
        userName,
      );

      const loginLimit = this.configService.get('failed_login_limit');
      throw new BadRequestException(
        `Password did not match. You have ${loginLimit -
          user.failed_login_count} more attempt/s left`,
      );
    }

    await this.userVerifyActionService.performSuccessVerificationAction(user);

    return result;
  }
}
