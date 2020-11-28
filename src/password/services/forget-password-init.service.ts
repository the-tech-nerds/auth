import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForgetPasswordInitRequest } from '../requests/forget-password-init.request';
import { CreateOtpService } from '../../otp/services/create-otp.service';
import { OtpRequest } from '../../otp/requests/otp.request';
import { OtpGenerateInfoResponse } from '../../otp/response/otp_generate_info.response';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class ForgetPasswordInitService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private createOtpService: CreateOtpService,
  ) {}

  async execute(
    forgetPasswordRequest: ForgetPasswordInitRequest,
  ): Promise<OtpGenerateInfoResponse> {
    const user = await this.userRepository.findOneOrFail({
      where: {
        phone: forgetPasswordRequest.phone,
        is_active: true,
      },
    });
    const otpReq = new OtpRequest();
    otpReq.phone = user.phone;
    otpReq.purpose = 'forget-pass';
    return this.createOtpService.create(otpReq);
  }
}
