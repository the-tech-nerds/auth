import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { PasswordManagementController } from './controllers/password-management.controller';

import { ForgetPasswordInitService } from './services/forget-password-init.service';
import { ForgetPasswordCompleteService } from './services/forget-password-complete.service';
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [
    ForgetPasswordInitService,
    ForgetPasswordCompleteService,
    ApiResponseService,
  ],
  controllers: [PasswordManagementController],
})
export class PasswordModule {}
