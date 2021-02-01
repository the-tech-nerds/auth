import { Repository } from 'typeorm';
import { SmsSingleService } from 'src/notification/sms/services/sms-single.service';
import { EmailNotification } from '@the-tech-nerds/common-services';
import { Otps } from '../entities/otp.entity';
import { OtpRequest } from '../requests/otp.request';
import { OtpGenerateInfoResponse } from '../response/otp_generate_info.response';
export declare class CreateOtpService {
    private otpsRepository;
    private smsSingleService;
    private emailNotification;
    constructor(otpsRepository: Repository<Otps>, smsSingleService: SmsSingleService, emailNotification: EmailNotification);
    create(otpRequest: OtpRequest, res: any): Promise<OtpGenerateInfoResponse>;
    checkOtpAvailability(mobile?: string, email?: string): Promise<Boolean>;
    generateOTP(length: number): string;
}
