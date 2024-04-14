import express, { json, urlencoded } from "express";
import cors from "cors";
import dotEnv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { route } from "./routers/routers.js";
import mongoose from "mongoose";
dotEnv.config({ debug: true });
const PORT = process.env.PORT;
const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
}));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser(undefined, {}));
app.use(morgan("dev"));
app.listen(PORT, () => console.log(`[*] server started on port ${PORT}`));
app.use((req, res, next) => route(req, res, next));
app.use((_, res) => res.status(404).json({ message: "page not found 😧" }));
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;
db.on("error", (err) => {
    console.log(err.message);
});
db.on("open", () => {
    console.log("[*] connected to database");
});
