import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import { CurrentDate } from '../utils/date-time-conversion/date-time-conversion';

export class CustomLoggerService implements LoggerService {
  log(message: string) {
    fs.writeFile(`./logs/log-${CurrentDate()}.txt`, `LOG: ${message}`, err => {
      // Rest of your code
      if (err) {
        //
      }
    });
  }

  error(message: string) {
    fs.writeFile(
      `./logs/error-${CurrentDate()}.txt`,
      `ERROR: ${message}`,
      err => {
        // Rest of your code
        if (err) {
          //
        }
      },
    );
  }

  warn(message: string) {
    fs.writeFile(
      `./logs/warning-${CurrentDate()}.txt`,
      `WARNING: ${message}`,
      err => {
        // Rest of your code
        if (err) {
          //
        }
      },
    );
  }

  debug(message: string) {
    fs.writeFile(
      `./logs/debug-${CurrentDate()}.txt`,
      `DEBUG: ${message}`,
      err => {
        // Rest of your code
        if (err) {
          //
        }
      },
    );
  }

  verbose(message: string) {
    fs.writeFile(
      `./logs/verbos-${CurrentDate()}.txt`,
      `VERBOSE: ${message}`,
      err => {
        // Rest of your code
        if (err) {
          //
        }
      },
    );
  }
}
