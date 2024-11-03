import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
dotenv.config();

import router from "./routes/index.js";
import adminRouter from "./routes/admin.js";
import cronJobInitial from "./config/cronJobInitial.js";

const app = express();
app.use(
  cors({
    origin: ["*"],
  })
);

app.use(express.static('./src/public'));

app.use(morgan("dev"));
app.use(express.json());

app.set('view engine', 'pug');

app.set('views', './src/views');


// connect db
connectDB();

cronJobInitial();

app.use("/api", router);

app.use("/admin", adminRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
