import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PermissionTypes } from '@technerds/common-services';

export default class PermissionSeed implements Seeder {
  // @ts-ignore
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const permissionCategoryRepository = await connection.getRepository(
      'permission_categories',
    );
    const permissionRepository = await connection.getRepository('permissions');
    await permissionRepository.delete({});
    await permissionCategoryRepository.delete({});
    let permissionCategoryEntry: any;
    let permissionList: any[] = [];
    let permissions: any;
    for (const pc of Object.keys(PermissionTypes)) {
      permissionCategoryEntry = await permissionCategoryRepository.save({
        name: pc,
        description: pc,
        created_by: 0,
      });
      permissionList = [];
      // @ts-ignore
      for (const permission of Object.keys(PermissionTypes[pc])) {
        // @ts-ignore
        permissionList.push({
          // @ts-ignore
          name: PermissionTypes[pc][permission],
          // @ts-ignore
          permissionCategoryId: permissionCategoryEntry?.id,
          created_by: 0,
          description: `${permissionCategoryEntry?.name}, ${permission}`,
        });
      }
      permissions = await permissionRepository.save(permissionList);
      permissionCategoryEntry.permissions = permissions;
      await permissionCategoryRepository.save(permissionCategoryEntry);
    }
    console.log('Permission and Permission Category seed run successfully');
  }
}
