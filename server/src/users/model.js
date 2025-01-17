import pool from "../shared/db.js";
import { handleError } from "../shared/utils.js";

export default class UsersModel {
  async addUser(user) {
    let { name, email } = user;

    try {
      await pool.query("INSERT INTO users (name, email) VALUES (?,?)", [
        name,
        email,
      ]);
      return { success: true, ok: "added user" };
    } catch (error) {
      handleError(error);
    }
  }

  async searchUser(id) {
    try {
      const [dato] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      if (dato === undefined) {
        return { error: "User already returned." };
      }

      const book = await pool.query(
        `
        SELECT 
          b.title, 
          b.author, 
          DATE_FORMAT(l.loan_date, '%Y-%m-%d') AS loan_date, 
          DATE_FORMAT(l.return_date, '%Y-%m-%d') AS return_date
        FROM 
          loans l
        JOIN 
          books b ON b.id = l.book_id
        JOIN 
          users u ON u.id = l.user_id
        WHERE 
          l.user_id = ?;
        `,
        [id]
      );

      const res = {
        success: true,
        user: dato,
        books: book,
      };

      return res;
    } catch (error) {
      handleError(error);
    }
  }
}
