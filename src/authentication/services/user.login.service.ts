import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CacheService } from '@technerds/common-services';
import { User } from '../../user/entities/user.entity';
import { UserRegistrationService } from './user.registration.service';
import { FetchUserByIdService } from '../../user/services/fetch-user-by-id.service';
import { FetchUserInfoByEmailService } from '../../user/services/fetch-user-by-email.service';

@Injectable()
export class UserLoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly fetchUserByIdService: FetchUserByIdService,
    private readonly cacheService: CacheService,
    private readonly userRegistrationService: UserRegistrationService,
    private readonly fetchUserInfoByEmailService: FetchUserInfoByEmailService,
  ) {}

  async login(user: Partial<User>) {
    const { email, id } = user;
    const { roles = [] } = (await this.fetchUserByIdService.execute(
      Number(id),
    )) as User;
    const allPermissions = roles
      .reduce((acc, role) => [...acc, ...role.permissions], [])
      .map(({ id: permissionId, name }) => ({ id: permissionId, name }));
    const allRoles = roles.map(({ id: roleId, name }) => ({
      id: roleId,
      name,
    }));

    const accessToken = this.jwtService.sign({
      email,
      id,
      roles: allRoles,
      permissions: allPermissions,
    });

    await this.cacheService.set(`user-token-${id}`, accessToken);

    return {
      access_token: accessToken,
      code: 200,
    };
  }

  async loginByGoogle(user: any) {
    let registerUser = (await this.fetchUserInfoByEmailService.execute(
      user.email,
    )) as any;

    if (!registerUser) {
      registerUser = (await this.userRegistrationService.register({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: ' ',
        google_auth: user.accessToken,
        image_url: user.picture,
      })) as any;
    }
    const accessToken = this.jwtService.sign({
      email: registerUser.email,
      id: registerUser.id,
      roles: [],
      permissions: [],
    });

    await this.cacheService.set(`user-token-${registerUser.id}`, accessToken);

    return {
      access_token: accessToken,
      code: 200,
    };
  }
}
