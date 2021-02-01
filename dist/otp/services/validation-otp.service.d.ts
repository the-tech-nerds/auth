import { Repository } from 'typeorm';
import { Otps } from '../entities/otp.entity';
import { OtpValidateRequest } from '../requests/otp-validate.request';
export declare class ValidateOtpService {
    private otpsRepository;
    constructor(otpsRepository: Repository<Otps>);
    validate(otpValidateRequest: OtpValidateRequest): Promise<boolean>;
}
