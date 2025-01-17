import dotenv from "dotenv";
import express from "express";
import users from "./users/api.js";
import books from "./books/api.js";
import loans from "./loans/api.js";
import errorRouter from "./error/api.js";

dotenv.config();

console.log("Starting API\n");

const app = express();
const port = process.env.EX_PORT || 3000;

// Disable the x-powered-by header
app.disable("x-powered-by");

// Middleware
app.use(express.json());

// Routes
app.use(users);
app.use(books);
app.use(loans);

// Routes Default
app.use(errorRouter)

app.listen(port, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
  } else {
    console.log(`Server is running on port http://localhost:${port}/`);
  }
});
