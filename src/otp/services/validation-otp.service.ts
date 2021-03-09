import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Otps } from '../entities/otp.entity';
import { LocalDateToUtc } from '../../utils/date-time-conversion/date-time-conversion';
import { OtpValidateRequest } from '../requests/otp-validate.request';

@Injectable()
export class ValidateOtpService {
  constructor(
    @InjectRepository(Otps)
    private otpsRepository: Repository<Otps>,
  ) {}

  async validate(otpValidateRequest: OtpValidateRequest): Promise<boolean> {
    let otp = null;
    if (otpValidateRequest.phone) {
      otp = await this.otpsRepository.findOne({
        where: {
          code: otpValidateRequest.code,
          phone: otpValidateRequest.phone,
          expiration_time: MoreThan(LocalDateToUtc(new Date())),
          status: false,
        },
      });
    }
    if (otpValidateRequest.email) {
      otp = await this.otpsRepository.findOne({
        where: {
          code: otpValidateRequest.code,
          email: otpValidateRequest.email,
          expiration_time: MoreThan(LocalDateToUtc(new Date())),
          status: false,
        },
      });
    }

    if (otp) {
      otp.status = true;
      await this.otpsRepository.update(otp.id, otp);
      return true;
    }

    throw new BadRequestException('invalid otp.');
  }
}
