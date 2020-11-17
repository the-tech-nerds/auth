import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class UserLoginService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: Partial<User>) {
    const { email, id } = user;
    return {
      access_token: this.jwtService.sign({ email, id }),
    };
  }
}
