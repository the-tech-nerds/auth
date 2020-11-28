import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { FetchUserByIdService } from '../../user/services/fetch-user-by-id.service';

@Injectable()
export class UserLoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly fetchUserByIdService: FetchUserByIdService,
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
    return {
      access_token: this.jwtService.sign({
        email,
        id,
        roles: allRoles,
        permissions: allPermissions,
      }),
    };
  }
}
