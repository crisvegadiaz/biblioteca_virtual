import pool from "../shared/db.js";
import { handleError } from "../shared/utils.js";

export default class BooksModel {
  async listBooks() {
    try {
      let res = await pool.query(
        `SELECT 
          id, 
          title, 
          author, 
          DATE_FORMAT(year_of_publication, '%Y-%m-%d') AS year_of_publication,
          available
        FROM books`
      );

      res = { success: true, books: res };
      return res;
    } catch (error) {
      handleError(error);
    }
  }

  async addBook(book) {
    let { title, author, year_of_publication } = book;

    try {
      await pool.query(
        `
          INSERT INTO books (title, author, year_of_publication)
          VALUES (?, ?, ?);
        `,
        [title, author, year_of_publication]
      );
      return { success: true, ok: "added book" };
    } catch (error) {
      handleError(error);
    }
  }

  async searchBook(id) {
    try {
      let [res] = await pool.query(
        `SELECT 
          id,
          title,
          author, 
          IFNULL(DATE_FORMAT(year_of_publication, '%Y-%m-%d'), NULL) 
          AS year_of_publication,
          available
        FROM books 
        WHERE id = ?`,
        [id]
      );

      if (res === undefined) {
        return { error: `Book not found ${id}` };
      }

      res = { success: true, book: res };
      return res;
    } catch (error) {
      handleError(error);
    }
  }
}
