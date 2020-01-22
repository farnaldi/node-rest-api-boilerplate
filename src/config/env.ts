import * as dotEnv from 'dotenv';

dotEnv.config();

export const NODE_ENV = String(process.env.NODE_ENV);
export const ALLOWED_ORIGINS = String(process.env.ALLOWED_ORIGINS);
export const API_URL = String(process.env.API_URL);
export const API_PORT = Number(process.env.API_PORT);
export const DB_HOST = String(process.env.DB_HOST);
export const DB_USER = String(process.env.DB_USER);
export const DB_PASSWORD = String(process.env.DB_PASSWORD);
export const DB_NAME = String(process.env.DB_NAME);
export const DB_PORT = Number(process.env.DB_PORT);
export const JWT_SECRET = String(process.env.JWT_SECRET);
export const JWT_EXPIRATION = String(process.env.JWT_EXPIRATION);
export const PWD_SALT_ROUNDS = Number(process.env.PWD_SALT_ROUNDS);
