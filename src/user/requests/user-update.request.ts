import { IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class UserUpdateRequest {
  @IsNotEmpty({ message: 'First Name is required.' })
  first_name: string;

  @IsNotEmpty({ message: 'Last Name is required.' })
  last_name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  @IsBoolean({ message: 'Is active should be boolean' })
  is_active: boolean;

  image_url: string;

  type: string;
}
