import { Controller, Get } from '@nestjs/common';

@Controller('authorization')
export class AuthorizationController {
    
  @Get('/')
  getUsers():string{
    return 'authorization works';
  }

}
