import { Routes } from 'nest-router';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { OtpModule } from './otp/otp.module';

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
];
