import { Router } from "express";

const loans = Router();

loans.post("/loans", (_, res) => {
  res.json({ saludo: "Hello loans!" });
});

loans.put("/loans/:id/return", (req, res) => {
  res.json({ saludo: `Hello loans put! ${req.params.id}` });
});

loans.get("/loans/user/:id", (req, res) => {
  res.json({ saludo: `Hello loans get! ${req.params.id}` });
});

export default loans;
