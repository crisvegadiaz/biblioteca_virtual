import { Router } from "express";
import { listBooks, searchBook, addBook } from "./service.js";

const books = Router();

books.get("/books", async (_, res) => {
  try {
    const books = await listBooks();
    res.json(books);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
});

books.post("/books", async (req, res) => {
  try {
    const book = await addBook(req.body);
    res.json(book);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
});

books.get("/books/:id", async (req, res) => {
  try {
    const book = await searchBook(req.params.id);
    res.json(book);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
});

export default books;
