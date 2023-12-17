import {config} from "dotenv";

config();
export const PORT = parseInt(process.env.PORT as string) | 3000;
export const HOST = process.env.HOST as string | "localhost";
export const DB_PORT = parseInt(process.env.DB_PORT as string) | 3306;
export const DB_HOST = process.env.DB_HOST as string | "localhost";
export const DB_USERNAME = process.env.DB_USERNAME as string | "root";
export const DB_PASSWORD = process.env.DB_PASSWORD as string | "mysql8";
export const DB_NAME = process.env.DB_NAME as string | "ecommerce";
export const SECRET_KEY = process.env.SECRET_KEY as string | "fjka3i2";
export const ADMIN_FIRSTNAME = process.env.ADMIN_FIRSTNAME as string | "ADMIN";
export const ADMIN_LASTNAME = process.env.ADMIN_LASTNAME as string | "ADMIN";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string | "ADMIN@gmail.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string | "ADMIN.111";