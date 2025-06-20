// sqlService.js
const sql = require('mssql');
const config = require('./sqlConfig');

async function querySQLServer(queryString) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(queryString);
    return result.recordset;
  } catch (err) {
    console.error('SQL Server Error:', err);
    throw err;
  }
}

module.exports = { querySQLServer };
