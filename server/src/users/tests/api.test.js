// Importamos las dependencias necesarias
import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "../api.js";

// Creamos una instancia de Express y usamos el router
const app = express();
app.use(express.json());
app.use(usersRouter);

describe("API Tests", () => {
  describe("GET /user/:id", () => {
    it("debería devolver un usuario válido con sus libros", async () => {
      const mockUser = {
        success: true,
        user: { id: 1, name: "Juan Pérez", email: "juan.perez@example.com" },
        books: [
          {
            title: "Cien Años de Soledad",
            author: "Gabriel García Márquez",
            loan_date: "2024-12-01",
            return_date: "2024-12-15",
          },
          {
            title: "Don Quijote de la Mancha",
            author: "Miguel de Cervantes",
            loan_date: "2024-11-20",
            return_date: "2024-12-01",
          },
          {
            title: "Don Quijote de la Mancha",
            author: "Miguel de Cervantes",
            loan_date: "2025-01-20",
            return_date: null,
          }
        ],
      };

      const res = await request(app).get("/user/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUser);
    });

    it("debería devolver un error si el ID no es numérico", async () => {
      const res = await request(app).get("/user/abc");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message:
          "The provided user ID (abc) is not valid. IDs must be numeric.",
        status: 400,
      });
    });

    it("debería devolver un error si el ID no existe", async () => {
      const res = await request(app).get("/user/100");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "User already returned.",
        status: 400,
      });
    });
  });

  describe("POST /users", () => {
    it("debería agregar un usuario válido", async () => {
      const mockUser = { name: "John Doe", email: "john.doe@example.com" };
      
      const res = await request(app).post("/users").send(mockUser);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ success: true, ok: "added user" });
    });

    it("debería devolver un error si falta el nombre o el email", async () => {
      const invalidUser = { name: "John" };

      const res = await request(app).post("/users").send(invalidUser);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "invalid object name and email are required.",
        status: 400,
      });
    });

    it("debería devolver un error si name no cumple con el formato", async () => {
      const invalidUser = { name: "John199", email: "john.doe@example.com" };

      const res = await request(app).post("/users").send(invalidUser);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Invalid name: John199.",
        status: 400,
      });
    });

    it("debería devolver un error si email no cumple con el formato", async () => {
      const invalidUser = { name: "John Doe", email: "invalid-email" };

      const res = await request(app).post("/users").send(invalidUser);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Invalid email: invalid-email.",
        status: 400,
      });
    });
  });
});
