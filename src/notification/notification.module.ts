import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseModule, FetchModule } from '@technerds/common-services';
import { SmsController } from './sms/controllers/sms.controller';
import { SMSService } from './sms/services/sms.service';
import { SmsSingleService } from './sms/services/sms-single.service';
import { SmsBulkService } from './sms/services/sms-bulk.service';
import { SmsDynamicService } from './sms/services/sms-dynamic.service';
import { SMSLogs } from './sms/entities/sms-logs.entity';
// @ts-ignore

@Module({
  controllers: [SmsController],
  imports: [
    TypeOrmModule.forFeature([SMSLogs]),
    FetchModule,
    ApiResponseModule,
  ],
  providers: [SMSService, SmsSingleService, SmsBulkService, SmsDynamicService],
  exports: [SmsSingleService],
})
export class NotificationModule {}
