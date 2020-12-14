import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';
import { Otps } from '../entities/otp.entity';
import { OtpRequest } from '../requests/otp.request';
import {
  addMinutes,
  LocalDateToUtc,
  subtractDay,
} from '../../utils/date-time-conversion/date-time-conversion';
import { OtpGenerateInfoResponse } from '../response/otp_generate_info.response';

@Injectable()
export class CreateOtpService {
  constructor(
    @InjectRepository(Otps)
    private otpsRepository: Repository<Otps>,
  ) {}

  async create(otpRequest: OtpRequest): Promise<OtpGenerateInfoResponse> {
    await this.checkOtpAvailability(otpRequest.phone);

    const otp = this.generateOTP(4);
    const otpModel = await this.otpsRepository.save({
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
      expire_time: otpModel.expiration_time,
    };
    return response;
  }

  async checkOtpAvailability(mobile: string): Promise<Boolean> {
    const currentUTCDate = LocalDateToUtc(new Date());

    //  count otp for last 30 days
    const otpCount = await this.otpsRepository.count({
      phone: mobile,
      time_sent: Between(subtractDay(currentUTCDate, 30), currentUTCDate),
    });
    if (otpCount > 30) {
      throw new Error('Monthly otp limit exceed .');
    }
    // check valid otp
    const validOtp = await this.otpsRepository.findOne({
      phone: mobile,
      expiration_time: MoreThan(currentUTCDate),
      status: false,
    });

    if (validOtp) {
      throw new Error('please try after sometimes.');
    }

    return true;
  }

  generateOTP(length: number): string {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i += 1) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
}