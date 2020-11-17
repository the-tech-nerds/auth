import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserValidationService } from '../services/user.validation.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userValidationService: UserValidationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = this.userValidationService.validate(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
