import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseModule,
  FetchModule,
} from '@the-tech-nerds/common-services';
import { SmsController } from './sms/controllers/sms.controller';
import { SMSService } from './sms/services/sms.service';
import { SmsSingleService } from './sms/services/sms-single.service';
import { SmsBulkService } from './sms/services/sms-bulk.service';
import { SmsDynamicService } from './sms/services/sms-dynamic.service';
import { SMSLogs } from './sms/entities/sms-logs.entity';
import { EmailController } from './email/controllers/email.controller';
import { EmailLogs } from './email/entities/email-logs.entity';
import { EmailService } from './email/services/email.service';

@Module({
  controllers: [SmsController, EmailController],
  imports: [
    TypeOrmModule.forFeature([SMSLogs, EmailLogs]),
    FetchModule,
    ApiResponseModule,
  ],
  providers: [
    SMSService,
    SmsSingleService,
    SmsBulkService,
    SmsDynamicService,
    EmailService,
  ],
  exports: [SmsSingleService, EmailService],
})
export class NotificationModule {}
