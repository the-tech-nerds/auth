import { Response } from 'express';
import { EMAILRequest } from '../requests/email.request';
import { EmailService } from '../services/email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(email: EMAILRequest, res: Response): Promise<void>;
}
