/**
 * Load Module Dependencies
 *
 */
import dotenv from "dotenv";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import chalk from "chalk";
import cors from "cors";
import timeout from "connect-timeout";

import router from "./api/index";

dotenv.config();

const app = express();

app.use(cors());

app.use(timeout("20s"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, access-control-allow-origin, x-api-applicationid, authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "OPITIONS, GET, PUT, PATCH, POST, DELETE"
  );
  next();
});

// Parser JSON body Requests
app.use(express.json({ limit: "100kb" }));

router(app);

app.use(function notFound(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.json({ message: err.message });
});

const ENVIRONMENT: string = app.get("env");
const PORT = 8008;
// Listen on Port
app.listen(PORT, function connectionListener() {
  console.log(
    chalk.green.italic(
      `Hi there! I'm listening on port ${PORT} in ${ENVIRONMENT} mode.`
    )
  );
});

// Export app interface
export default app;
