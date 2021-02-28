import { Repository } from 'typeorm';
import { EmailNotification, SmsNotification } from '@the-tech-nerds/common-services';
import { Otps } from '../entities/otp.entity';
import { OtpRequest } from '../requests/otp.request';
import { OtpGenerateInfoResponse } from '../response/otp_generate_info.response';
export declare class CreateOtpService {
    private otpsRepository;
    private emailNotification;
    private smsNotification;
    constructor(otpsRepository: Repository<Otps>, emailNotification: EmailNotification, smsNotification: SmsNotification);
    create(otpRequest: OtpRequest, res: any): Promise<OtpGenerateInfoResponse>;
    checkOtpAvailability(mobile?: string, email?: string): Promise<Boolean>;
    generateOTP(length: number): string;
}
