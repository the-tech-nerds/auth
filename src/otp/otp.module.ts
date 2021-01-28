import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  NotificationModule,
} from '@the-tech-nerds/common-services';
import { NotificationModule as LocalNotificationModule } from 'src/notification/notification.module';
import { UserModule } from 'src/user/user.module';
import { Otps } from './entities/otp.entity';
import { CreateOtpService } from './services/create-otp.service';
import { ValidateOtpService } from './services/validation-otp.service';
// eslint-disable-next-line import/named
import { OtpController } from './controller/otp.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otps]),
    LocalNotificationModule,
    UserModule,
    NotificationModule,
  ],
  providers: [CreateOtpService, ValidateOtpService, ApiResponseService],
  controllers: [OtpController],
  exports: [CreateOtpService],
})
export class OtpModule {}
