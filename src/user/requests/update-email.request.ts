import { IsNotEmpty } from 'class-validator';

export class UpdateEmailRequest {
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;
}
