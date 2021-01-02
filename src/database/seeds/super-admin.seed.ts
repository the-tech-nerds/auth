import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';

export default class SuperAdminSeed implements Seeder {
  // @ts-ignore
  public async run(factory: Factory, connection: Connection): Promise<any> {
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
        password: await hash('khan@123', 10),
        created_by: 0,
      });
    } else {
      // @ts-ignore
      user.first_name = 'Super';
      // @ts-ignore
      user.last_name = 'Admin';
      // @ts-ignore
      user.type = 1;
      // @ts-ignore
      user.email = 'admin@khanfcbd.com';
      // @ts-ignore
      user.is_mobile_verified = 1;
      // @ts-ignore
      user.password = await hash('khan@123', 10);
      // @ts-ignore
      user.created_by = 0;
    }
    // @ts-ignore
    user.roles = [role];
    // @ts-ignore
    await userRepository.save(user);
  }
}
