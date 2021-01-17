import { IsNotEmpty } from 'class-validator';

export class OtpRequest {
  @IsNotEmpty({ message: 'Phone number is required.' })
  phone?: string;

  email?: string;

  @IsNotEmpty({ message: 'purpose number is required.' })
  purpose: string;
}
