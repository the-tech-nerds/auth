import { IsNotEmpty } from 'class-validator';

export class CityRequest {
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsNotEmpty({ message: 'division is required.' })
  division_id: number;
}
