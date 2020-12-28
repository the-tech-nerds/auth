import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';

export default class SuperAdminSeed implements Seeder {
  // @ts-ignore
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userRepository = await connection.getRepository('user');
    const roleRepository = await connection.getRepository('roles');
    await roleRepository.delete({});
    await userRepository.delete({});
    const role = await roleRepository.save({
      created_by: 0,
      name: 'Super Admin',
    });
    const user = await userRepository.save({
      first_name: 'Super',
      last_name: 'Admin',
      type: 1,
      email: 'admin@khanfcbd.com',
      is_mobile_verified: 1,
      password: await hash('khan@123', 10),
      created_by: 0,
    });
    // @ts-ignore
    user.roles = [role];
    await userRepository.save(user);
  }
}
