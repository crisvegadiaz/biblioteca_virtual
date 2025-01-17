import BooksModel from "./model.js";
import { handleError } from "../shared/utils.js";

export async function listBooks() {
  try {
    const res = await new BooksModel().listBooks();
    return res;
  } catch (error) {
    handleError(error);
  }
}

export async function searchBook(id) {
  if (!/^\d+$/.test(id)) {
    handleError(
      `The provided book ID (${id}) is not valid. IDs must be numeric.`
    );
  }

  try {
    const res = await new BooksModel().searchBook(id);
    if (res.error) handleError(res.error);

    return res;
  } catch (error) {
    handleError(error);
  }
}

export async function addBook(book) {
  if (!Object.hasOwn(book, "title") || !Object.hasOwn(book, "author")) {
    handleError("Invalid object title and author are required.");
  }

  if (Object.hasOwn(book, "year_of_publication")) {
    const expDate = /^\d{4}-\d{2}-\d{2}$/;

    if (!expDate.test(book.year_of_publication)) {
      handleError("Invalid date format yyyy-mm-dd.");
    }
  }

  try {
    const res = await new BooksModel().addBook(book);
    return res;
  } catch (error) {
    handleError(error);
  }
}
