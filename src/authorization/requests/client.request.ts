import { IsNotEmpty } from 'class-validator';

export class ClientRequest {
  @IsNotEmpty({ message: 'Client name is required.' })
  name: string;
}
