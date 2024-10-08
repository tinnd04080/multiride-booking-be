import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["*"],
  })
);
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
