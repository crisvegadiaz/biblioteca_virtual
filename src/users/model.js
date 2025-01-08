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
      return { ok: "added user" };
    } catch (error) {
      handleError(error);
    }
  }

  async searchUser(id) {
    try {
      const [dato] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      if (dato === undefined) {
        return null;
      }

      const book = await pool.query(
        `
        SELECT 
          b.title, 
          b.author, 
          l.loan_date, 
          l.return_date
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
        user: dato,
        books: book,
      };

      return res;
    } catch (error) {
      handleError(error);
    }
  }
}
