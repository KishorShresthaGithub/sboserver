import express, { json, urlencoded } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/register_routes";
import cors from "cors";
import compression from "compression";
import sqlize from "./database";

const app = express();

(async () => {
  try {
    await sqlize.sync();
  } catch (error) {
    console.log(error);
  }
})();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(compression());
}

app.use("/public", cors(), express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

export default app;
