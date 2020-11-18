import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginRequest {
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
