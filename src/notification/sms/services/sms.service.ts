import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SMSLogs } from '../entities/sms-logs.entity';
import { SMSLogModel } from '../interfaces/sms-log.interface';

@Injectable()
export class SMSService {
  protected readonly domain = 'https://smsplus.sslwireless.com/';

  protected readonly api_token = '9595b67e-cb2e-47e4-801e-5b19321eb52f';

  public sid = 'KHANFRESHNONAPI';

  generateCSMSID(key: string = '') {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    try {
      for (let i = 0; i < 20; i += 1) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return key + result.substr(0, 20);
    } catch (e) {
      return result;
    }
  }

  async storeSMSLogs(smsLogs: SMSLogModel[], repo: Repository<SMSLogs>) {
    const sls = await repo.save(smsLogs);
    return sls;
  }
}
