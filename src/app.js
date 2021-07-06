import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/register_routes";
import sqlize from "./database";

const app = express();

// (async () => {
//   sqlize.sync();
// })();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/api", router);

export default app;
