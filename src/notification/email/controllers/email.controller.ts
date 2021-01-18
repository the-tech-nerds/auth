import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EMAILRequest } from '../requests/email.request';

import { EmailService } from '../services/email.service';
import { TrackingType } from '../entities/email-logs.entity';

@Controller('send')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('email')
  sendEmail(@Body() email: EMAILRequest, @Res() res: Response) {
    email.template = 'email-template';
    email.purpose = 'registration';
    email.tracking_type = TrackingType.USER;
    email.from = 'thetechnerdss@gmail.com';
    email.tracking_id = 'test241564';
    email.tracking_id = 'TEST';
    email.subject = 'Registration';
    email.data = { message: 'Hello Bangladesh ' };
    return this.emailService.sendMail(email, res);
  }
}
