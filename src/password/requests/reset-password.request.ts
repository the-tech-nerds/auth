import { IsNotEmpty, MinLength, ValidateIf } from 'class-validator';

export class ResetPasswordRequest {
  @IsNotEmpty({ message: 'User id is required.' })
  user_id: number;

  @IsNotEmpty({ message: 'Old password is required.' })
  old_password: string;

  @IsNotEmpty({ message: 'New password is required.' })
  @MinLength(8, { message: 'Password must be atleast 8 characters' })
  new_password: string;

  @IsNotEmpty({ message: 'Password confirmation is required.' })
  @ValidateIf(user => user.new_password !== user.new_password_confirm)
  new_password_confirm: string;
}
