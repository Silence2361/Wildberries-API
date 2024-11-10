import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import * as path from 'path';

dotenv.config();

/**
 * Knex configuration object for connecting to the database.
 * Loads environment variables to set up database connection details.
 * @type {Knex.Config}
 */
const config: Knex.Config = {
  client: process.env.DB_CLIENT || 'pg',
  connection: {
    /** Database host, loaded from environment variable DB_HOST */
    host: process.env.DB_HOST,

    /** Database port, loaded from environment variable DB_PORT */
    port: Number(process.env.DB_PORT) || 5432,

    /** Database name, loaded from environment variable DB_NAME */
    database: process.env.DB_NAME,

    /** Database user, loaded from environment variable DB_USER */
    user: process.env.DB_USER,

    /** Database password, loaded from environment variable DB_PASSWORD */
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    /** Directory path for storing database migration files */
    directory: path.resolve(__dirname, 'database/migrations'),
  },
};

export default config;
