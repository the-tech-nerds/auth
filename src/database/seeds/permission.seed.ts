import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PermissionTypes } from '@the-tech-nerds/common-services';

export default class PermissionSeed implements Seeder {
  // @ts-ignore
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const permissionCategoryRepository = await connection.getRepository(
      'permission_categories',
    );
    const permissionRepository = await connection.getRepository('permissions');
    let permissionCategoryEntry: any;
    let permissionList: any[] = [];
    const deletedPermissionCategoryIds: number[] = [];
    let permissions: any;
    const permissionType: any = PermissionTypes;
    for (const pc of Object.keys(permissionType)) {
      permissionCategoryEntry = await permissionCategoryRepository.findOne({
        name: pc,
        description: pc,
        created_by: 0,
      });
      if (!permissionCategoryEntry) {
        permissionCategoryEntry = await permissionCategoryRepository.save({
          name: pc,
          description: pc,
          created_by: 0,
        });
      }
      const permissionListOld =
        (await permissionRepository.find({
          permission_category: permissionCategoryEntry,
        })) || [];
      permissionList = [];
      // @ts-ignore
      for (const permission of Object.keys(permissionType[pc])) {
        const index = permissionListOld.findIndex(
          // @ts-ignore
          (permissionOld: any) =>
            permissionOld.name === permissionType[pc][permission],
        );
        if (index === -1) {
          permissionList.push({
            // @ts-ignore
            name: permissionType[pc][permission],
            // @ts-ignore
            permissionCategoryId: permissionCategoryEntry?.id,
            created_by: 0,
            description: `${permissionCategoryEntry?.name}, ${permission}`,
          });
        } else {
          // @ts-ignore
          await permissionRepository.update(permissionListOld[index].id, {
            // @ts-ignore
            name: permissionType[pc][permission],
            created_by: 0,
            description: `${permissionCategoryEntry?.name}, ${permission}`,
          });
        }
      }
      deletedPermissionCategoryIds.push(permissionCategoryEntry?.id);
      permissions = await permissionRepository.save(permissionList);
      permissionCategoryEntry.permissions = [
        ...permissionListOld,
        ...permissions,
      ];
      await permissionCategoryRepository.save(permissionCategoryEntry);
    }
    await permissionCategoryRepository.remove(
      await permissionCategoryRepository
        .createQueryBuilder('permission_categories')
        .where(`id not in (${deletedPermissionCategoryIds.join(',')})`)
        .getMany(),
    );
  }
}
