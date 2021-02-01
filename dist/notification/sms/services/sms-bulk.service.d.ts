import { FetchService } from '@the-tech-nerds/common-services';
import { SMSService } from './sms.service';
export declare class SmsBulkService extends SMSService {
    private fetch;
    url: string;
    sid: string;
    constructor(fetch: FetchService);
    sendBulkSMS(smsBody: {
        msisdn: string[];
        text: string;
        batch_csms_id: string;
    }): Promise<void>;
}
