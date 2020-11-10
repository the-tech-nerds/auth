import BaseEntity from "src/share/entities/base-entity";

interface PermissionsModel extends BaseEntity{
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
  