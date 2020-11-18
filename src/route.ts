import { Routes } from 'nest-router';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthenticationModule } from './authentication/authentication.module';

export const routes: Routes = [
  {
    path: '/authorization',
    module: AuthorizationModule,
  },
  {
    path: '/authentication',
    module: AuthenticationModule,
  },
];
