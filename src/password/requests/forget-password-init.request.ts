import { IsNotEmpty } from 'class-validator';

export class ForgetPasswordInitRequest {
  @IsNotEmpty({ message: 'Mobile Number is required.' })
  phone: string;

  email?: string;
}
