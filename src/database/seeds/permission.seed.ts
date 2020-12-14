// import { Factory, Seeder } from 'typeorm-seeding';
// import { Connection } from 'typeorm';
// import permission_details from '../../authorization/utils/permission-types/permission.type';
//
// export default class PermissionSeed implements Seeder {
//   // @ts-ignore
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     const permissionCategoryRepository = await connection.getRepository('permission_categories');
//     const permissionRepository = await connection.getRepository('permissions');
//     for (const pc of Object.keys(permission_details)) {
//       const permissionCategoryEntry = await permissionCategoryRepository.save({
//         name: pc, description: pc, created_by: 0,
//       });
//       const permissionList: any[] = [];
//       // @ts-ignore
//       for (const permission of Object.keys(permission_details[pc])) {
//         permissionList.push({
//           // @ts-ignore
//           name: permission_details[pc][permission],
//           // @ts-ignore
//           permissionCategoryId: permissionCategoryEntry.id,
//           created_by: 0,
//           description: `${permissionCategoryEntry.name}, ${permission}`,
//         });
//       }
//       permissionRepository.save(permissionList);
//     }
//   }
// }
