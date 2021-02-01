import { FetchService } from '@the-tech-nerds/common-services';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { SMSLogs } from '../entities/sms-logs.entity';
import { SingleSmsRequest } from '../requests/single-sms.request';
import { SMSService } from './sms.service';
export declare class SmsSingleService extends SMSService {
    private fetch;
    private smsLogsRepository;
    url: string;
    sid: string;
    constructor(fetch: FetchService, smsLogsRepository: Repository<SMSLogs>);
    sendSingleSMS(smsBody: SingleSmsRequest, res: Response): Promise<any>;
    private getBodyData;
    private getResponseFormattedDate;
}
