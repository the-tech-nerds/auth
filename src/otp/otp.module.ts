import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otps } from './entities/otp.entity';
import { CreateOtpService } from './services/create-otp.service';
import { ValidateOtpService } from './services/validation-otp.service';
// eslint-disable-next-line import/named
import { OtpController } from './controller/otp.controller';
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';

@Module({
  imports: [TypeOrmModule.forFeature([Otps])],
  providers: [CreateOtpService, ValidateOtpService, ApiResponseService],
  controllers: [OtpController],
  exports: [CreateOtpService],
})
export class OtpModule {}
