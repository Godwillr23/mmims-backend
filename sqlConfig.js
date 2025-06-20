require('dotenv').config();

module.exports = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER, // REQUIRED - must be a string
  database: process.env.SQL_DATABASE,
  port: parseInt(process.env.SQL_PORT) || 1433, // optional
  options: {
    encrypt: false, // true for Azure
    trustServerCertificate: true // for development
  }
};
