import express from "express";
import request from "supertest";
import { describe, it, expect } from "vitest";
import loansRouter from "../api.js";

const app = express();
app.use(express.json());
app.use(loansRouter);

describe("API Tests for Loans", () => {
  // Tests para listar préstamos por usuario
  describe("GET /loans/user/:id", () => {
    it("debe enumerar todos los préstamos para un usuario", async () => {
      const listLoans = [
        {
          title: "Cien Años de Soledad",
          loan_date: "2024-12-01",
          return_date: "2024-12-15",
        },
        {
          title: "Don Quijote de la Mancha",
          loan_date: "2024-11-20",
          return_date: "2024-12-01",
        },
      ];

      const res = await request(app).get("/loans/user/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        books: listLoans,
      });
    });

    it("debería devolver un error si el id no es valido", async () => {
      const res = await request(app).get("/loans/user/ls"); // Usuario sin préstamos

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "The provided user ID (ls) is not valid. IDs must be numeric.",
        status: 400,
      });
    });

    it("debería devolver un error si el user no existe", async () => {
      const res = await request(app).get("/loans/user/100"); // ID de usuario no numérico

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "User not exists",
        status: 400,
      });
    });
  });

  // Tests para la creación de préstamos
  describe("POST /loans", () => {
    it("debería crear un nuevo préstamo", async () => {
      const loanData = { id_user: 1, id_book: 4 };

      const res = await request(app).post("/loans").send(loanData);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ success: true, message: "Loan created" });
    });

    it("debería devolver un error si faltan datos loans", async () => {
      const loanData = { id_user: 1 };
      const res = await request(app).post("/loans").send(loanData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Invalid loan data must have an id_user and an id_book",
        status: 400,
      });
    });

    it("debería devolver un error si el id_user no es valido", async () => {
      const loanData = { id_user: "ls", id_book: 2 };
      const res = await request(app).post("/loans").send(loanData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "The provided user ID (ls) is not valid. IDs must be numeric.",
        status: 400,
      });
    });

    it("debería devolver un error si el id_book no es valido", async () => {
      const loanData = { id_user: 2, id_book: "ls" };
      const res = await request(app).post("/loans").send(loanData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual(
        expect.objectContaining({
          success: false,
          message:
            "The provided book ID (ls) is not valid. IDs must be numeric.",
          status: 400,
        })
      );
    });

    it("debería devolver un error si el user no existe", async () => {
      const loanData = { id_user: 100, id_book: 5 };

      const res = await request(app).post("/loans").send(loanData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "User not exists",
        status: 400,
      });
    });

    it("debería devolver un error si el book no existe", async () => {
      const loanData = { id_user: 2, id_book: 100 };

      const res = await request(app).post("/loans").send(loanData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Book not exists",
        status: 400,
      });
    });

    it("debería devolver un error si el book no esta disponible", async () => {
      const loanData = { id_user: 2, id_book: 3 };

      const res = await request(app).post("/loans").send(loanData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Book not available",
        status: 400,
      });
    });
  });

  // Tests para la devolución de préstamos
  describe("PUT /loans/:id/return", () => {
    it("debe devolver un préstamo con éxito", async () => {
      const res = await request(app).put("/loans/3/return");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: "Loan returned",
      });
    });

    it("debería devolver un error si el id no es valido", async () => {
      const res = await request(app).put("/loans/ls/return");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "The provided book ID (ls) is not valid. IDs must be numeric.",
        status: 400,
      });
    });

    it("debería devolver un error si el book no existe", async () => {
      const res = await request(app).put("/loans/100/return");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Book not exists",
        status: 400,
      });
    });

    it("debería devolver un error si el book ya fue devuelto", async () => {
      const res = await request(app).put("/loans/1/return");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Book already returned",
        status: 400,
      });
    });
  });
});
