import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegistrationRequest {
  @IsNotEmpty({ message: 'First Name is required.' })
  first_name: string;

  @IsNotEmpty({ message: 'Last Name is required.' })
  last_name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  password: string;

  google_auth?: string;

  image_url?: string;
}
