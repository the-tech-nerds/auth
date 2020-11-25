import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordManagementController } from './controllers/password-management.controller';

import { ForgetPasswordInitService } from './services/forget-password-init.service';
import { ForgetPasswordCompleteService } from './services/forget-password-complete.service';
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    ForgetPasswordInitService,
    ForgetPasswordCompleteService,
    ApiResponseService,
  ],
  controllers: [PasswordManagementController],
})
export class PasswordModule {}
