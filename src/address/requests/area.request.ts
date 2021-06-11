import { IsNotEmpty } from 'class-validator';

export class AreaRequest {
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsNotEmpty({ message: 'city is required.' })
  city_id: number;
}
