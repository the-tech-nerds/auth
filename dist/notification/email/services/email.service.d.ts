import { Repository } from 'typeorm';
import { EMAILRequest } from '../requests/email.request';
import { EmailLogs } from '../entities/email-logs.entity';
export declare class EmailService {
    private emailLogsRepository;
    constructor(emailLogsRepository: Repository<EmailLogs>);
    sendMail(email: EMAILRequest, res: any): Promise<void>;
    private saveEmailData;
}
