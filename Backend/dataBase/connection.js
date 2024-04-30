
import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "127.0.0.1",
  port: 3306,
  database: "Sincro",
  user: "root",
  password: "12345",
});