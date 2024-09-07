const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const createPoolWithDB = (dbName) => {
  return mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName, // Dynamically passed database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

module.exports = createPoolWithDB;
