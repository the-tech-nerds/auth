import { SetMetadata } from '@nestjs/common';

export const HasPermissions = (permissions: string[], type: number = 1) =>
  SetMetadata('has-permissions', {
    permissions,
    type,
  });
