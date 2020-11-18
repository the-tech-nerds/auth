import { IsNotEmpty } from 'class-validator';

export class TokenRequest {
  @IsNotEmpty({ message: 'Client is required' })
  client_id: string;

  @IsNotEmpty({ message: 'Client secret is required' })
  secret: string;

  @IsNotEmpty({ message: 'Authorization code is required' })
  code: string;

  @IsNotEmpty({ message: 'Grant type is required' })
  grant_type: string;

  @IsNotEmpty({ message: 'Redirect uri is required' })
  redirect_uri: string;
}
