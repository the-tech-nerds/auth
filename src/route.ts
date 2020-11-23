import { Routes } from 'nest-router';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';

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
    path: '/user',
    module: UserModule,
  },
  {
    path: '/address',
    module: AddressModule,
  },
];
