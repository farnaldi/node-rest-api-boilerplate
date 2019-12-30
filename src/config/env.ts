import * as dotEnv from 'dotenv';

dotEnv.config();

export const { ALLOWED_ORIGINS } = process.env;
export const { API_URL } = process.env;
export const { API_PORT } = process.env;
export const { DB_HOST } = process.env;
export const { DB_USER } = process.env;
export const { DB_PASSWORD } = process.env;
export const { DB_NAME } = process.env;
export const DB_PORT = Number(process.env.DB_PORT);
export const { JWT_SECRET } = process.env;
export const { JWT_EXPIRATION } = process.env;
export const PWD_SALT_ROUNDS = Number(process.env);
