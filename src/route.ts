import { Routes } from 'nest-router';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { OtpModule } from './otp/otp.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { PasswordModule } from './password/password.module';

export const routes: Routes = [
  {
    path: '/authorization',
    module: AuthorizationModule,
  },
  {
    path: '/authentication',
    module: AuthenticationModule,
  },
  {
    path: '/otp',
    module: OtpModule,
  },
  {
    path: '/user',
    module: UserModule,
  },
  {
    path: '/address',
    module: AddressModule,
  },
  {
    path: '/password',
    module: PasswordModule,
  },
];
