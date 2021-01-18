import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';
import { SmsSingleService } from 'src/notification/sms/services/sms-single.service';
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
    private smsSingleService: SmsSingleService,
  ) {}

  async create(
    otpRequest: OtpRequest,
    res: any,
  ): Promise<OtpGenerateInfoResponse> {
    if (otpRequest.email && otpRequest.phone) {
      throw new BadRequestException(
        'Please select only email or phone number.',
      );
    }
    if (otpRequest.phone) {
      await this.checkOtpAvailability(otpRequest.phone, otpRequest.email);
    }
    if (otpRequest.email) {
      await this.checkOtpAvailability(otpRequest.phone, otpRequest.email);
    }

    const otp = this.generateOTP(4);
    const otpModel = await this.otpsRepository.save({
      ...otpRequest,
      code: otp,
      time_sent: LocalDateToUtc(new Date()),
      expiration_time: LocalDateToUtc(addMinutes(new Date(), 1)),
    });

    // send otp to desire number or email
    if (otpRequest.phone) {
      await this.smsSingleService.sendSingleSMS(
        {
          msisdn: otpRequest.phone === undefined ? '' : otpRequest.phone,
          purpose: otpRequest.purpose,
          text: `your otp is: ${otp}`,
          user_id: 0,
        },
        res,
      );
    }
    if (otpRequest.email) {
      // send email here
    }
    const response: OtpGenerateInfoResponse = {
      info: 'OTP have sent',
      sent_number: otpRequest.phone,
      sent_email: otpRequest.email,
      purpose: otpRequest.purpose,
      expire_time: otpModel.expiration_time,
    };
    return response;
  }

  async checkOtpAvailability(
    mobile?: string,
    email?: string,
  ): Promise<Boolean> {
    const currentUTCDate = LocalDateToUtc(new Date());
    let otpCount = 0;
    let validOtp = null;
    //  count otp for last 30 days
    if (mobile) {
      otpCount = await this.otpsRepository.count({
        phone: mobile,
        time_sent: Between(subtractDay(currentUTCDate, 30), currentUTCDate),
      });
    }
    if (email) {
      otpCount = await this.otpsRepository.count({
        email,
        time_sent: Between(subtractDay(currentUTCDate, 30), currentUTCDate),
      });
    }
    if (otpCount > 30) {
      throw new BadRequestException('Monthly otp limit exceed .');
    }
    // check valid otp

    if (mobile) {
      validOtp = await this.otpsRepository.findOne({
        phone: mobile,
        expiration_time: MoreThan(currentUTCDate),
        status: false,
      });
    }

    if (email) {
      validOtp = await this.otpsRepository.findOne({
        email,
        expiration_time: MoreThan(currentUTCDate),
        status: false,
      });
    }
    if (validOtp) {
      throw new BadRequestException('please try after sometimes.');
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
