import { BadRequestException, Injectable } from '@nestjs/common';
/* eslint-disable no-empty */
import { JwtService } from '@nestjs/jwt';

import { CacheService } from '@the-tech-nerds/common-services';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from '../../user/entities/user.entity';
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(user: Partial<User>, userType: number) {
    const { email, id, phone } = user;
    const {
      roles = [],
      type,
      userShop = [],
    } = (await this.fetchUserByIdService.execute(Number(id))) as User;

    if (userType !== type) {
      throw new BadRequestException(`User with ${email || phone} not found.`);
    }

    const filteredRoles = roles.filter(role => role.is_active);

    const allPermissions = filteredRoles
      .reduce((acc, role) => [...acc, ...role.permissions], [])
      .map(({ id: permissionId, name }) => ({ id: permissionId, name }));
    const allRoles = filteredRoles.map(({ id: roleId, name }) => ({
      id: roleId,
      name,
    }));

    const shopIds = userShop.map(m => m.shop_id);
    const accessToken = this.jwtService.sign({
      email,
      phone,
      id,
      roles: allRoles,
      permissions: allPermissions,
      shops: shopIds,
    });

    await this.cacheService.set(`user-token-${id}`, accessToken);

    return {
      id,
      access_token: accessToken,
      code: 200,
    };
  }

  async loginByGoogle(user: any) {
    let registerUser = (await this.fetchUserInfoByEmailService.execute(
      user.email,
      UserType.USER,
    )) as any;

    if (!registerUser) {
      registerUser = (await this.userRegistrationService.register({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: ' ',
        google_auth: user.accessToken,
        image_url: user.picture,
        is_email_verified: true,
      })) as any;
    } else {
      registerUser = {
        ...registerUser,
        first_name: user.first_name,
        last_name: user.lastName,
        google_auth: user.google_auth,
        image_url: user.picture,
      };
      await this.userRepository.save(registerUser);
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

  async loginByFacebook(user: any) {
    let userProfileInfo = await this.userRepository.findOne({
      facebook_user_id: user.facebook_profile_id,
    });
    if (userProfileInfo) {
      userProfileInfo = {
        ...userProfileInfo,
        first_name: user.first_name,
        last_name: user.lastName,
        google_auth: user.facebook_auth,
        image_url: user.picture,
      };
      await this.userRepository.save(userProfileInfo);
    } else {
      userProfileInfo = (await this.userRegistrationService.register({
        first_name: user.firstName,
        last_name: user.lastName,
        password: ' ',
        facebook_auth: user.accessToken,
        image_url: user.picture,
        facebook_user_id: user.facebook_profile_id,
      })) as any;
    }

    const accessToken = this.jwtService.sign({
      email: userProfileInfo?.email,
      id: userProfileInfo?.id,
      roles: [],
      permissions: [],
    });
    await this.cacheService.set(
      `user-token-${userProfileInfo?.id}`,
      accessToken,
    );

    return {
      access_token: accessToken,
      code: 200,
    };
  }
}
