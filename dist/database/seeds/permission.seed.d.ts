import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class PermissionSeed implements Seeder {
    run(factory: Factory, connection: Connection): Promise<any>;
}
