import { IsNotEmpty } from 'class-validator';

export class UserRegistrationRequest {
  @IsNotEmpty({ message: 'First Name is required.' })
  first_name: string;

  @IsNotEmpty({ message: 'Last Name is required.' })
  last_name: string;

  email?: string;

  phone?: string;

  password: string;

  google_auth?: string;

  image_url?: string;

  facebook_auth?: string;

  facebook_user_id?: string;

  is_email_verified?: boolean;

  is_mobile_verified?: boolean;

  type?: number;
}
