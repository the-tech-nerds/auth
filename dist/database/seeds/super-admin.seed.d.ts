import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class SuperAdminSeed implements Seeder {
    run(factory: Factory, connection: Connection): Promise<any>;
}
