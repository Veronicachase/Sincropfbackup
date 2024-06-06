
import { createPool } from "mysql2/promise";
requiere ('dotenv').config();

export const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
<<<<<<< HEAD





=======
>>>>>>> d9ef4e5097aa3a3678c4331fac38dc58f0676fc8
