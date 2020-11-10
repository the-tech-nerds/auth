import { Controller } from '@nestjs/common';
import { BaseController } from '../share/controllers/base.controller';

@Controller()
export class AuthorizationController extends BaseController {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }
}
