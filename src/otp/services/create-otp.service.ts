import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otps } from '../entities/otp.entity';
import { OtpRequest } from '../requests/otp.request';
import {
  addMinutes,
  LocalDateToUtc,
} from '../../utils/date-time-conversion/date-time-conversion';
import { OtpGenerateInfoResponse } from '../response/otp_generate_info.response';

@Injectable()
export class CreateOtpService {
  constructor(
    @InjectRepository(Otps)
    private otpsRepository: Repository<Otps>,
  ) {}

  async create(otpRequest: OtpRequest): Promise<OtpGenerateInfoResponse> {
    const otp = await this.generateOTP(4);
    await this.otpsRepository.save({
      ...otpRequest,
      code: otp,
      time_sent: LocalDateToUtc(new Date()),
      expiration_time: LocalDateToUtc(addMinutes(new Date(), 5)),
    });
    // send otp to desire number or email

    const response: OtpGenerateInfoResponse = {
      info: 'OTP have sent to specific mobile number',
      sent_number: otpRequest.phone,
      sent_email: otpRequest.email,
      purpose: otpRequest.purpose,
      expire_time: 5,
    };
    return response;
  }

  async generateOTP(length: number): Promise<string> {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i += 1) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
}
