import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class UpdateRoleService extends AuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }
}
