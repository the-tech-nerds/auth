import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import { CurrentDate } from '../utils/date-time-conversion/date-time-conversion';

export class CustomLoggerService implements LoggerService {
  log(message: string) {
    fs.writeFile(`./logs/log-${CurrentDate()}.txt`, `data: ${message}`, err => {
      // Rest of your code
      if (err) throw err;
    });
  }

  error(message: string, trace: string) {
    /* your implementation */
  }

  warn(message: string) {
    /* your implementation */
  }

  debug(message: string) {
    /* your implementation */
  }

  verbose(message: string) {
    /* your implementation */
  }
}
