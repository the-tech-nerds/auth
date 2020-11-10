import { Controller } from '@nestjs/common';
import { AuthorizationController } from '../authorization.controller';

@Controller()
export class RoleController extends AuthorizationController {
}
