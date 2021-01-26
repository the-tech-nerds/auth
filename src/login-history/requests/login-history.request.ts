import { IsNotEmpty } from 'class-validator';

export class LoginHistoryRequest {
  @IsNotEmpty({ message: 'Request source is required.' })
  request_source: number;

  email?: string | null;

  phone?: string | null;

  @IsNotEmpty({ message: 'Status is required.' })
  status: boolean;
}
