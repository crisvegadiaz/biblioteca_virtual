import { Router } from "express";
import { returnLoan, bookLoan, historyLoan } from "./service.js";

const loans = Router();

loans.post("/loans", async (req, res) => {
  try {
    const result = await bookLoan(req.body);
    res.status(201).json(result);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json(err);
  }
});

loans.put("/loans/:id/return", async (req, res) => {
  try {
    const result = await returnLoan(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json(err);
  }
});

loans.get("/loans/user/:id", async (req, res) => {
  try {
    const result = await historyLoan(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json(err);
  }
});

export default loans;
