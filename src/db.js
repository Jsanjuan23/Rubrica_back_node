import mysql from 'mysql2'
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config.js';


// Credenciales de la conexion a la base de datos

export const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE
});

//-----------------------------------------------//


// Valida si la conexión es exitosa o no

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa');
  }
});

//-----------------------------------------------//