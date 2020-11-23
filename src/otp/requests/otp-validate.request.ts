import { IsNotEmpty } from 'class-validator';

export class OtpValidateRequest {
  @IsNotEmpty({ message: 'Phone number is required.' })
  phone: string;

  @IsNotEmpty({ message: 'otp code is required.' })
  code: string;

  email?: string;
}
