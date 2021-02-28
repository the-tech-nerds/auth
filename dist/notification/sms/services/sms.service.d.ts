import { Repository } from 'typeorm';
import { SMSLogs } from '../entities/sms-logs.entity';
import { SMSLogModel } from '../interfaces/sms-log.interface';
export declare class SMSService {
    protected readonly domain = "https://smsplus.sslwireless.com/";
    protected readonly api_token = "9595b67e-cb2e-47e4-801e-5b19321eb52f";
    sid: string;
    generateCSMSID(key?: string): string;
    storeSMSLogs(smsLogs: SMSLogModel[], repo: Repository<SMSLogs>): Promise<(SMSLogModel & SMSLogs)[]>;
}
