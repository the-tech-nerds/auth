import { IsNotEmpty } from 'class-validator';

export class OtpRequest {
  phone?: string;

  email?: string;

  @IsNotEmpty({ message: 'purpose number is required.' })
  purpose: string;
}
