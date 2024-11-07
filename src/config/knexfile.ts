import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import * as path from 'path';

dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: 'postgres://postgres:12345678@localhost:5432/wb_db',

  migrations: {
    directory: path.resolve(__dirname, './database/migrations'),
  },
};

console.log('Knex Configuration:', config);

export default config;
