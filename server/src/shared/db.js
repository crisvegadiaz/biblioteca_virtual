import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USER ||
  !process.env.DB_PASS
) {
  throw {
    message: "Missing required environment variables for database connection",
    status: 500,
  };
}

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  acquireTimeout: 20000,
});

(async () => {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log("Connected to DB");
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error Connecting to DB:\n", err);
    } else {
      console.error("Error Connecting to DB");
    }
  } finally {
    if (connection) connection.end();
  }
})();

process.on("SIGINT", async () => {
  try {
    await pool.end();
    console.log("DB pool closed gracefully");
    process.exit(0);
  } catch (err) {
    console.error("Error closing DB pool:", err);
    process.exit(1);
  }
});

export default pool;
