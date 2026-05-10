import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL || 'postgresql://postgres:fcac41078f2abd6c272b8601a8511f0c@localhost:5432/bd-avantcargo',
    entities: [
        __dirname + '/../../../**/*.entity{.ts,.js}',
        __dirname + '/../../../modules/users/infra/typeorm/entities/*.{ts,js}',
    ],
    migrations: [
        __dirname + '/migrations/*.{ts,js}'
    ],
    migrationsTableName: 'migrations',
    synchronize: true,
});