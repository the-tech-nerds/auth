import { IsNotEmpty } from 'class-validator';

export class OtpValidateRequest {
  phone?: string;

  @IsNotEmpty({ message: 'otp code is required.' })
  code: string;

  email?: string;
}
