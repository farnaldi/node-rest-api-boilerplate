import * as path from 'path';
import * as env from './src/config/env';

// eslint-disable-next-line import/no-extraneous-dependencies
require('ts-node/register');

module.exports = {
    client: 'mysql',
    connection: {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        port: env.DB_PORT,
        charset: 'utf8mb4',
        timezone: 'Z',
        pool: {
            min: 2,
            max: 10,
        },
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.join(__dirname, '/src/database/migrations'),
    },
};
