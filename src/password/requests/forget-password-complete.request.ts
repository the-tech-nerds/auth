import { IsNotEmpty, MinLength } from 'class-validator';

export class ForgetPasswordCompleteRequest {
  @IsNotEmpty({ message: 'Mobile Number is required.' })
  phone: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be atleast 8 characters' })
  password: string;

  email?: string;
}
