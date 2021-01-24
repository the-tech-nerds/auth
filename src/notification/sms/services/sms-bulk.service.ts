import { Injectable } from '@nestjs/common';
import { FetchService } from '@the-tech-nerds/common-services';
import { SMSService } from './sms.service';

@Injectable()
export class SmsBulkService extends SMSService {
  url = 'api/v3/send-sms/bulk';

  sid = 'KHANFRESHNONBULK';

  constructor(private fetch: FetchService) {
    super();
    this.url = this.domain + this.url;
  }

  async sendBulkSMS(smsBody: {
    msisdn: string[];
    text: string;
    batch_csms_id: string;
  }) {
    await this.fetch
      .execute(this.url, {
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
}
