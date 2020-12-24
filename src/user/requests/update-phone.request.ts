import { IsNotEmpty } from 'class-validator';

export class UpdatePhoneRequest {
  user_id?: number;

  @IsNotEmpty({ message: 'Phone number is required.' })
  phone: string;
}
