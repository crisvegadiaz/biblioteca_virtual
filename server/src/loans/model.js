import pool from "../shared/db.js";
import { handleError } from "../shared/utils.js";

export default class LoansModel {
  async bookLoan(datos) {
    let { id_book, id_user, loanDate } = datos;

    try {
      const userExists = await this.#getUserExistence(id_user);
      if (userExists === 0) {
        return { error: "User not exists" };
      }

      const bookExists = await this.#getBookExists(id_book);
      if (bookExists === 0) {
        return { error: "Book not exists" };
      }

      const bookAvailable = await this.#getBookAvailable(id_book);
      if (bookAvailable === 0) {
        return { error: "Book not available" };
      }

      await pool.query(
        `INSERT INTO loans (book_id, user_id, loan_date) 
        VALUES (?, ?, ?)`,
        [id_book, id_user, loanDate]
      );
      return { success: true, message: "Loan created" };
    } catch (error) {
      handleError(error);
    }
  }

  async returnLoan(id, date) {
    const book = await this.#getBookExists(id);
    if (book === 0) {
      return { error: "Book not exists" };
    }

    const bookAvailable = await this.#getBookAvailable(id);
    if (bookAvailable === 1) {
      return { error: "Book already returned" };
    }

    try {
      await pool.query(
        `UPDATE books SET available = 1 
        WHERE id = ?`,
        [id]
      );

      await pool.query(
        `UPDATE loans SET return_date = ? 
        WHERE book_id = ? AND return_date IS NULL`,
        [date, id]
      );
      return { success: true, message: "Loan returned" };
    } catch (error) {
      handleError(error);
    }
  }

  async historyLoan(id) {
    const userExists = await this.#getUserExistence(id);
    if (userExists === 0) {
      return { error: "User not exists" };
    }

    try {
      const res = await pool.query(
        `SELECT 
          books.title,
          DATE_FORMAT(loans.loan_date, '%Y-%m-%d') AS loan_date,
          IFNULL(DATE_FORMAT(loans.return_date, '%Y-%m-%d'), NULL) 
          AS return_date
        FROM loans 
        JOIN books ON loans.book_id = books.id 
        WHERE loans.user_id = ?;`,
        [id]
      );

      if (res.length === 0) {
        return { success: true, message: "No loans found" };
      }

      return { success: true, books: res };
    } catch (error) {
      handleError(error);
    }
  }

  async #getBookAvailable(id_book) {
    const [book] = await pool.query(
      `SELECT available FROM books WHERE id = ?`,
      [id_book]
    );
    return book.available;
  }

  async #getUserExistence(id_user) {
    const [user] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE id = ?) AS existe;`,
      [id_user]
    );
    return user.existe;
  }

  async #getBookExists(id_book) {
    const [book] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM books WHERE id = ?) AS existe;`,
      [id_book]
    );
    return book.existe;
  }
}
