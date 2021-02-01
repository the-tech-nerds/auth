"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
class SuperAdminSeed {
    async run(factory, connection) {
        const userRepository = await connection.getRepository('user');
        const roleRepository = await connection.getRepository('roles');
        let role = await roleRepository.findOne({ name: 'Super Admin' });
        if (!role) {
            role = await roleRepository.save({
                created_by: 0,
                name: 'Super Admin',
            });
        }
        let user = await userRepository.findOne({
            email: 'admin@khanfcbd.com',
        });
        if (!user) {
            user = await userRepository.save({
                first_name: 'Super',
                last_name: 'Admin',
                type: 1,
                email: 'admin@khanfcbd.com',
                is_mobile_verified: 1,
                password: await bcryptjs_1.hash('khan@123', 10),
                created_by: 0,
            });
        }
        else {
            user.first_name = 'Super';
            user.last_name = 'Admin';
            user.type = 1;
            user.email = 'admin@khanfcbd.com';
            user.is_mobile_verified = 1;
            user.password = await bcryptjs_1.hash('khan@123', 10);
            user.created_by = 0;
        }
        user.roles = [role];
        await userRepository.save(user);
    }
}
exports.default = SuperAdminSeed;
//# sourceMappingURL=super-admin.seed.js.map