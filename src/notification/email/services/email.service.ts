import { Injectable } from '@nestjs/common';
import { config, SES } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMAILRequest } from '../requests/email.request';
import { DeliveryStatus, EmailLogs } from '../entities/email-logs.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailLogs)
    private emailLogsRepository: Repository<EmailLogs>,
  ) {}

  public async sendMail(email: EMAILRequest, res: any): Promise<void> {
    await res.render(
      email.template,
      { ...email.data },
      (err: any, html: any) => {
        config.update({ region: 'us-east-1' });
        // @ts-ignore
        new SES({ apiVersion: '2010-12-01' })
          .sendEmail({
            Destination: {
              CcAddresses: [...(email.cc || [])],
              ToAddresses: [...email.to],
            },
            Message: {
              Body: {
                Html: {
                  Charset: 'UTF-8',
                  Data: html,
                },
              },
              Subject: {
                Charset: 'UTF-8',
                Data: email.subject,
              },
            },
            Source: 'arifulcuet52@gmail.com',
            ReplyToAddresses: [],
          })
          .promise()
          .then((data): Promise<any> => this.saveEmailData(email, data, true))
          .catch(
            (error): Promise<any> => this.saveEmailData(email, error, false),
          );
      },
    );
  }

  private async saveEmailData(
    email: EMAILRequest,
    err_or_data: any,
    is_success: boolean,
  ) {
    await this.emailLogsRepository.save({
      to: JSON.stringify(email.to),
      from: email.from,
      cc: JSON.stringify(email.cc),
      bcc: JSON.stringify(email.bcc),
      subject: email.subject,
      body: email.body,
      template: email.template,
      data: JSON.stringify(email.data),
      purpose: email.purpose,
      tracking_id: email.tracking_id,
      tracking_type: email.tracking_type,
      delivery_status: is_success ? DeliveryStatus.SEND : DeliveryStatus.FAILED,
      attachments: JSON.stringify(email.attachments),
      aws_success_response: is_success
        ? JSON.stringify(err_or_data)
        : JSON.stringify(undefined),
      fail_reason: is_success
        ? JSON.stringify(undefined)
        : JSON.stringify(err_or_data),
    });
  }
}
