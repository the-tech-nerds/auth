import BaseEntity from 'src/utils/entities/base-entity';

interface PermissionModel extends BaseEntity {
  id: number;
  name: string;
  description: string;
  permissionCategoryId: number;
  isActive: boolean;
}

interface PermissionCategoryModel extends BaseEntity {
  id: number;
  name: string;
  description: string;
}
