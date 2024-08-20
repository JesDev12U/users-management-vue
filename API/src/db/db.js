import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_KEY,
  database: "users_management",
});

export default pool;
