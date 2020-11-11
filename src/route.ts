import { Routes } from 'nest-router';
import { AuthorizationModule } from './authorization/authorization.module';

export const routes: Routes = [
  {
    path: '/authorization',
    module: AuthorizationModule,
  },
];
