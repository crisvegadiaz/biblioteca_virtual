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
    throw { message: `Invalid id: ${id}`, status: 400 };
  }  

  try {
    const res = await new BooksModel().searchBook(id);
    if (!res) {
      throw { message: `Book not found ${id}`, status: 404 };
    }

    return res;
  } catch (error) {
    handleError(error);
  }
}

export async function addBook(book) {
  if (!Object.hasOwn(book, "title") || !Object.hasOwn(book, "author")) {
    throw {
      message: "invalid object title and author are required",
      status: 400,
    };
  }

  if (Object.hasOwn(book, "yearOfPublication")) {
    const expDate = /^\d{4}-\d{2}-\d{2}$/;

    if (expDate.test(book.yearOfPublication)) {
      throw { message: "invalid date format yyyy-mm-dd", status: 400 };
    }
  }

  try {
    const res = await new BooksModel().addBook(book);
    return res;
  } catch (error) {
    handleError(error);
  }
}
