"use strict";
const ormconfig = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'authdb',
    port: Number(process.env.MYSQL_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    maxQueryExecutionTime: 10000,
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    synchronize: true,
    migrationsRun: false,
    logging: true,
    logger: 'file',
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    cli: {
        migrationsDir: 'src/migrations',
    },
};
module.exports = ormconfig;
//# sourceMappingURL=database.js.map