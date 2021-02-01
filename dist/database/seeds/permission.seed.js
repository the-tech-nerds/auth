"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_services_1 = require("@the-tech-nerds/common-services");
class PermissionSeed {
    async run(factory, connection) {
        const permissionCategoryRepository = await connection.getRepository('permission_categories');
        const permissionRepository = await connection.getRepository('permissions');
        let permissionCategoryEntry;
        let permissionList = [];
        const deletedPermissionCategoryIds = [];
        let permissions;
        const permissionType = common_services_1.PermissionTypes;
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
            const permissionListOld = (await permissionRepository.find({
                permission_category: permissionCategoryEntry,
            })) || [];
            permissionList = [];
            for (const permission of Object.keys(permissionType[pc])) {
                const index = permissionListOld.findIndex((permissionOld) => permissionOld.name === permissionType[pc][permission]);
                if (index === -1) {
                    permissionList.push({
                        name: permissionType[pc][permission],
                        permissionCategoryId: permissionCategoryEntry === null || permissionCategoryEntry === void 0 ? void 0 : permissionCategoryEntry.id,
                        created_by: 0,
                        description: `${permissionCategoryEntry === null || permissionCategoryEntry === void 0 ? void 0 : permissionCategoryEntry.name}, ${permission}`,
                    });
                }
                else {
                    await permissionRepository.update(permissionListOld[index].id, {
                        name: permissionType[pc][permission],
                        created_by: 0,
                        description: `${permissionCategoryEntry === null || permissionCategoryEntry === void 0 ? void 0 : permissionCategoryEntry.name}, ${permission}`,
                    });
                }
            }
            deletedPermissionCategoryIds.push(permissionCategoryEntry === null || permissionCategoryEntry === void 0 ? void 0 : permissionCategoryEntry.id);
            permissions = await permissionRepository.save(permissionList);
            permissionCategoryEntry.permissions = [
                ...permissionListOld,
                ...permissions,
            ];
            await permissionCategoryRepository.save(permissionCategoryEntry);
        }
        await permissionCategoryRepository.remove(await permissionCategoryRepository
            .createQueryBuilder('permission_categories')
            .where(`id not in (${deletedPermissionCategoryIds.join(',')})`)
            .getMany());
    }
}
exports.default = PermissionSeed;
//# sourceMappingURL=permission.seed.js.map