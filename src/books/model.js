import pool from "../shared/db.js";
import { handleError } from "../shared/utils.js";

export default class BooksModel {
  async listBooks() {
    try {
      const res = await pool.query("SELECT * FROM books");
      return res;
    } catch (error) {
      handleError(error);
    }
  }

  async addBook(book) {
    let { title, author, yearOfPublication } = book;

    try {
      await pool.query(
        `
          INSERT INTO books (title, author, year_of_publication)
          VALUES (?, ?, ?);
        `,
        [title, author, yearOfPublication]
      );
      return { ok: "added book" };
    } catch (error) {
      handleError(error);
    }
  }

  async searchBook(id) {
    try {
      const [res] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
      if (res === undefined) {
        return null;
      }

      return res;
    } catch (error) {
      handleError(error);
    }
  }
}
