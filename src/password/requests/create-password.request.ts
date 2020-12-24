import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePasswordRequest {
  @IsNotEmpty({ message: 'User id is required.' })
  user_id: number;

  @IsNotEmpty({ message: 'New password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  new_password: string;

  @IsNotEmpty({ message: 'Password confirmation is required.' })
  new_password_confirm: string;
}
