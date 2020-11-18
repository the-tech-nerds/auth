import {
  IsEmail, MinLength, IsNotEmpty, IsBoolean,
} from 'class-validator';

export class UserRequest {
  @IsNotEmpty({ message: 'First Name is required.' })
  first_name: string;

  @IsNotEmpty({ message: 'Last Name is required.' })
  last_name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be atleast 8 charracters' })
  password: string;

  @IsBoolean({ message: 'Is active should be boolean' })
  is_active: boolean;

  facebook_auth: string;

  google_auth: string;

  image_url: string;

  type: string;
}
