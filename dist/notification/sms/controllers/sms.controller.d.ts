import { Response } from 'express';
import { SmsSingleService } from '../services/sms-single.service';
import { SingleSmsRequest } from '../requests/single-sms.request';
export declare class SmsController {
    private readonly smsSingleService;
    constructor(smsSingleService: SmsSingleService);
    sendSMSSingle(smsData: SingleSmsRequest, res: Response): Promise<any>;
    sendSMSBulk(smsData: {
        msisdn: string;
        text: string;
        csms_id: string;
    }): void;
    sendSMSDynamic(smsData: {
        msisdn: string;
        text: string;
        csms_id: string;
    }): void;
}
