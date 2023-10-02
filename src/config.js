import { config } from "dotenv";

config()

export const PORT  = process.env.PORT || 3005
export const DB_DATABASE  = process.env.DB_DATABASE || 'gestion_productos'
export const DB_USER  = process.env.DB_USER || 'admin'
export const DB_PASSWORD  = process.env.DB_PASSWORD || '0000'
export const DB_PORT  = process.env.DB_PORT || 3306
export const DB_HOST  = process.env.DB_HOST || 'localhost'