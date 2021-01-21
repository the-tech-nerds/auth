import { Injectable } from '@nestjs/common';
import {
  FetchService,
  // @ts-ignore
  ApiResponseService,
} from '@the-tech-nerds/common-services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { SMSLogs } from '../entities/sms-logs.entity';
import { SingleSmsRequest } from '../requests/single-sms.request';
import { SMSService } from './sms.service';
import { SMSResponse } from '../responses/sms.response';

@Injectable()
export class SmsSingleService extends SMSService {
  url = 'api/v3/send-sms';

  sid = 'KHANFRESHNONAPI';

  constructor(
    private fetch: FetchService,
    @InjectRepository(SMSLogs)
    private smsLogsRepository: Repository<SMSLogs>,
  ) {
    super();
    this.url = this.domain + this.url;
  }

  async sendSingleSMS(smsBody: SingleSmsRequest, res: Response): Promise<any> {
    const response = await this.fetch.execute(this.url, {
      method: 'POST',
      body: this.getBodyData(smsBody),
    });

    if (
      response?.status?.toUpperCase() === 'SUCCESS' ||
      response.status_code === 200
    ) {
      await this.storeSMSLogs(
        this.getResponseFormattedDate(response, smsBody),
        this.smsLogsRepository,
      );
      return 'success';
    }
    await this.storeSMSLogs(
      this.getResponseFormattedDate(response, smsBody),
      this.smsLogsRepository,
    );
    return 'SMS send failed';
  }

  private getBodyData(smsBody: SingleSmsRequest) {
    try {
      return {
        api_token: this.api_token,
        sid: this.sid,
        msisdn: smsBody.msisdn,
        sms: smsBody.text,
        csms_id: this.generateCSMSID(),
      };
    } catch (e) {
      return [];
    }
  }

  private getResponseFormattedDate(response: any, smsBody: SingleSmsRequest) {
    try {
      return (
        response?.smsinfo?.map((sms: SMSResponse) => ({
          sid: this.sid,
          csms_id: sms.csms_id,
          api_token: this.api_token,
          msisdn: sms.msisdn,
          reference_id: sms.reference_id,
          body: sms.sms_body,
          purpose: smsBody.purpose,
          sms_lang: sms.sms_body,
          sms_status: sms.sms_status,
          status_message: sms.status_message,
          user_id: smsBody.user_id,
          status: response.status,
          code: response.status_code,
        })) || []
      );
    } catch (e) {
      return [];
    }
  }
}
