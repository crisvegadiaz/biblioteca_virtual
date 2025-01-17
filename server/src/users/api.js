import { Router } from "express";
import { addUser, searchUser } from "./service.js";

const users = Router();

users.post("/users", async (req, res) => {
  try {
    const user = await addUser(req.body);
    res.json(user);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json(err);
  }
});

users.get("/user/:id", async (req, res) => {
  try {
    const user = await searchUser(req.params.id);
    res.json(user);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json(err);
  }
});

export default users;
