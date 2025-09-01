import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { startDB } from "./src/config/db.js";
startDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
