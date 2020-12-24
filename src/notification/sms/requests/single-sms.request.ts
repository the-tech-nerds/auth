import { Matches, MaxLength, MinLength } from 'class-validator';

export class SingleSmsRequest {
  @Matches(/^01[3456789][0-9]{8}$/, {
    message: 'Mobile no should be a valid number',
  })
  @MaxLength(11, { message: 'Mobile no Should be 11 digit' })
  msisdn: string;

  @MaxLength(100, { message: 'A sms should not greater than 100 character' })
  text: string;

  @MinLength(3, { message: 'Please define the purpose of this sms' })
  purpose: string;

  user_id: number;
}
