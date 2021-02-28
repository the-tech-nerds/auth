import { IsNotEmpty } from 'class-validator';

export class LoginHistoryRequest {
  @IsNotEmpty({ message: 'Request source is required.' })
  request_source: number;

  @IsNotEmpty({ message: 'user name is required.' })
  userName: string;

  @IsNotEmpty({ message: 'Status is required.' })
  status: boolean;
}
