// Importamos las dependencias necesarias
import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import express from "express";
import books from "../api.js";
// import * as service from "../service.js";

// Creamos una instancia de Express y usamos el router
const app = express();
app.use(express.json());
app.use(books);

describe("API Tests for Books", () => {
  describe("GET /books", () => {
    it("debería retornar una lista de libros", async () => {
      const mockBooks = [
        {
          id: 1,
          title: "Cien Años de Soledad",
          author: "Gabriel García Márquez",
          year_of_publication: "1967-05-30",
          available: 1,
        },
        {
          id: 2,
          title: "1984",
          author: "George Orwell",
          year_of_publication: "1949-06-08",
          available: 1,
        },
        {
          id: 3,
          title: "El Principito",
          author: "Antoine de Saint-Exupéry",
          year_of_publication: "1943-04-06",
          available: 1,
        },
        {
          id: 4,
          title: "Don Quijote de la Mancha",
          author: "Miguel de Cervantes",
          year_of_publication: "1605-01-16",
          available: 1,
        },
        {
          id: 5,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          year_of_publication: "1937-08-10",
          available: 1,
        },
      ];

      const res = await request(app).get("/books");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ success: true, books: mockBooks });
    });

    it("debería manejar errores al obtener la lista de libros", async () => {
      service.listBooks.mockRejectedValue({
        success: false,
        message: "Error running query",
        status: 500,
      });

      const res = await request(app).get("/books");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        success: false,
        message: "Error running query",
        status: 500,
      });
    });
  });

  describe("POST /books", () => {
    it("debería agregar un libro válido", async () => {
      const newBook = { title: "Fahrenheit 451", author: "Ray Bradbury" };
      service.addBook.mockResolvedValue({ success: true, ok: "added book" });

      const res = await request(app).post("/books").send(newBook);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ success: true, ok: "added book" });
      expect(service.addBook).toHaveBeenCalledWith(newBook);
    });

    it("debería devolver un error si faltan datos del libro", async () => {
      const incompleteBook = { title: "Incomplete Book" };
      service.addBook.mockRejectedValue({
        success: false,
        message: "Invalid object title and author are required.",
        status: 400,
      });

      const res = await request(app).post("/books").send(incompleteBook);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Invalid object title and author are required.",
        status: 400,
      });
    });

    it("debería devolver un error si la fecha no este en el formato (yyyy-mm-dd)", async () => {
      const dataErrorBook = {
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        year_of_publication: "lsls-lslsl",
      };

      service.addBook.mockRejectedValue({
        success: false,
        message: "Invalid date format yyyy-mm-dd.",
        status: 400,
      });

      const res = await request(app).post("/books").send(dataErrorBook);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Invalid date format yyyy-mm-dd.",
        status: 400,
      });
    });
  });

  describe("GET /books/:id", () => {
    it("debería retornar un libro por ID", async () => {
      const mockBook = {
        success: true,
        book: {
          id: 1,
          title: "Cien Años de Soledad",
          author: "Gabriel García Márquez",
          year_of_publication: "1967-05-30",
          available: 1,
        },
      };
      service.searchBook.mockResolvedValue({ success: true, book: mockBook });

      const res = await request(app).get("/book/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ success: true, book: mockBook });
      expect(service.searchBook).toHaveBeenCalledWith("1");
    });

    it("debería manejar un ID no válido", async () => {
      service.searchBook.mockRejectedValue({
        success: false,
        message: "The provided book ID (ls) is not valid. IDs must be numeric.",
        status: 400,
      });

      const res = await request(app).get("/book/ls");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "The provided book ID (ls) is not valid. IDs must be numeric.",
        status: 400,
      });
    });

    it("debería manejar un libro no encontrado", async () => {
      service.searchBook.mockRejectedValue({
        success: false,
        message: "Book not found 100",
        status: 400,
      });

      const res = await request(app).get("/book/100");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Book not found 100",
        status: 400,
      });
    });
  });
});
