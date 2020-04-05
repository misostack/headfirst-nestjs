import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {ConnectionOptions} from 'typeorm';


const SRC_DIR = path.resolve(__dirname, '..')
const ROOT_DIR = path.resolve(__dirname, '..', '..')

console.log(ROOT_DIR)

if(fs.existsSync(`${ROOT_DIR}/.env`)){
	dotenv.config()
}
// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '123456',
  name: process.env.DATABASE_NAME || 'example',
  // {module}/entities/resource.entity.ts
  entities: [SRC_DIR + '/modules/api/entities/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  logger: 'advanced-console',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [SRC_DIR + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: SRC_DIR + '/migrations',
  },
};

export = config;