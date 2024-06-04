const mysql = require("mysql2/promise");
let db = {};

db.createConnection = async () => {
  try {
    const mysqlConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      dateStrings: true,
    });
    return mysqlConnection;
  } catch (error) {
    throw new Error(error.message);
  }
};


db.query = async (sqlQuery, params, type, conn) => {
  try {
    const [result] = await conn.query(sqlQuery, params);
    switch (type) {
      case "select":
        return JSON.parse(JSON.stringify(result));
      case "insert":
        return parseInt(result.insertId);
      case "update":
      case "replace":
      case "delete":
        if (result.affectedRows > 0) {
          return true;
        } else {
          return false;
        }
      default:
        throw new Error("Query type not matched");
    }
  } catch (error) {
    console.error("Query or database error: ", error);
    throw new Error(error.message);
  }
};
module.exports = db;
