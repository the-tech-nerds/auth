import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@technerds/common-services';
import { PasswordManagementController } from './controllers/password-management.controller';

import { ForgetPasswordInitService } from './services/forget-password-init.service';
import { ForgetPasswordCompleteService } from './services/forget-password-complete.service';
import { User } from '../user/entities/user.entity';
import { ResetPasswordService } from './services/reset-password.service';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), OtpModule],
  providers: [
    ApiResponseService,
    ForgetPasswordInitService,
    ForgetPasswordCompleteService,
    ResetPasswordService,
  ],
  controllers: [PasswordManagementController],
})
export class PasswordModule {}
