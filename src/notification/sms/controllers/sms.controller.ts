import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SmsSingleService } from '../services/sms-single.service';
import { SingleSmsRequest } from '../requests/single-sms.request';

@Controller('send')
export class SmsController {
  constructor(
    private readonly smsSingleService: SmsSingleService,
  ) // private readonly smsBulkService: SmsBulkService,
  // private readonly smsDynamicService: DynamicModule,
  {}

  @Post('single-sms')
  sendSMSSingle(@Body() smsData: SingleSmsRequest, @Res() res: Response) {
    smsData.user_id = 62;
    return this.smsSingleService.sendSingleSMS({ ...smsData }, res);
  }

  @Post('bulk-sms')
  sendSMSBulk(
    @Body() smsData: { msisdn: string; text: string; csms_id: string },
  ) {
    // return this.smsService.sendSingleSMS({ ...smsData });
  }

  @Post('dynamic-sms')
  sendSMSDynamic(
    @Body() smsData: { msisdn: string; text: string; csms_id: string },
  ) {
    // return this.smsService.sendSingleSMS({ ...smsData });
  }
}
