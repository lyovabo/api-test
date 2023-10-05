import { join } from 'path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT as string),
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DB,
  entities: [join(__dirname, 'src', '**/**', '*.entity.{ts,js}')],
  subscribers: [join(__dirname, 'src', '**/**', '*.subscriber.{ts,js}')],
  migrations: [join(__dirname, 'src', 'migrations', '*{.ts,.js}')],
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'development' ? true : false,
  synchronize: false,
});

postgresDataSource
  .initialize()
  .then(() => {
    console.log('TypeORM Postgres Data Source has been initialized!');
  })
  .catch((err) => {
    console.error(
      'Error during TypeORM Postgres Data Source initialization',
      err,
    );
  });
export default postgresDataSource;
