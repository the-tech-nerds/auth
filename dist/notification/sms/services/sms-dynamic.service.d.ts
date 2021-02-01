import { FetchService } from '@the-tech-nerds/common-services';
import { SMSService } from './sms.service';
export declare class SmsDynamicService extends SMSService {
    private fetch;
    url: string;
    sid: string;
    constructor(fetch: FetchService);
    sendSingleSMS(smsBody: {
        msisdn: string;
        text: string;
        csms_id: string;
    }): Promise<void>;
    sendBulkSMS(smsBody: {
        msisdn: string[];
        text: string;
        batch_csms_id: string;
    }): Promise<void>;
    sendDynamicSMS(smsBody?: {
        msisdn: string;
        text: string;
        csms_id: string;
    }[]): Promise<void>;
}
