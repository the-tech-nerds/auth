import BaseEntity from 'src/share/entities/base-entity';

interface PermissionsModel {
  id: number;
  name: string;
  description: string;
  permissionCategoryId: number;
}

interface PermissionCategoryModel extends BaseEntity {
  id: number;
  name: string;
  description: string;
}
