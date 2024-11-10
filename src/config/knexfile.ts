import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import * as path from 'path';

dotenv.config();

const config: Knex.Config = {
  client: process.env.DB_CLIENT || 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: path.resolve(__dirname, 'database/migrations'),
  },
};

export default config;
