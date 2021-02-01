import { Repository } from 'typeorm';
import { ForgetPasswordInitRequest } from '../requests/forget-password-init.request';
import { CreateOtpService } from '../../otp/services/create-otp.service';
import { OtpGenerateInfoResponse } from '../../otp/response/otp_generate_info.response';
import { User } from '../../user/entities/user.entity';
export declare class ForgetPasswordInitService {
    private userRepository;
    private createOtpService;
    constructor(userRepository: Repository<User>, createOtpService: CreateOtpService);
    execute(forgetPasswordRequest: ForgetPasswordInitRequest, res: any): Promise<OtpGenerateInfoResponse>;
}
