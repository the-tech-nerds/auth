import { Injectable } from '@nestjs/common';
import { FetchService } from '@technerds/common-services';
import { SMSService } from './sms.service';

@Injectable()
export class SmsDynamicService extends SMSService {
  url = 'api/v3/send-sms/dynamic';

  sid = 'KHANFRESHNONBULK';

  constructor(private fetch: FetchService) {
    super();
    this.url = this.domain + this.url;
  }

  async sendSingleSMS(smsBody: {
    msisdn: string;
    text: string;
    csms_id: string;
  }) {
    const response = await this.fetch
      .execute(this.url, {
        method: 'POST',
        body: {
          api_token: this.api_token,
          sid: this.sid,
          msisdn: smsBody.msisdn,
          sms: smsBody.text,
          csms_id: smsBody.csms_id,
        },
      })
      .then(res => res.data);
  }

  async sendBulkSMS(smsBody: {
    msisdn: string[];
    text: string;
    batch_csms_id: string;
  }) {
    const response = await this.fetch
      .execute('/api/v3/send-sms/dynamic', {
        method: 'POST',
        body: {
          api_token: this.api_token,
          sid: this.sid,
          msisdn: [...smsBody.msisdn],
          sms: smsBody.text,
          batch_csms_id: smsBody.batch_csms_id,
        },
      })
      .then(res => res.data);
  }

  async sendDynamicSMS(
    smsBody: { msisdn: string; text: string; csms_id: string }[] = [],
  ) {
    const response = await this.fetch
      .execute('/api/v3/send-sms/dynamic', {
        method: 'POST',
        body: {
          api_token: this.api_token,
          sid: this.sid,
          sms: [...smsBody],
        },
      })
      .then(res => res.data);
  }
}
