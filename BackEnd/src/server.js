import express from "express";
// import "../src/register.js";
import exitHook from "async-exit-hook";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "./config/mongodb.js";
import { env } from "../src/config/environment.js";
import { APIs_V1 } from "../src/routes/v1/index.js";
// import { errorHandlingMiddleware } from "../src/middlewares/errorHandlingMiddleware.js";
import cors from "cors";

const START_SERVER = () => {
  const app = express();

  // Cho phep tao frontend connect backend
  app.use(cors());

  app.use(express.json());

  app.use("/api/v1", APIs_V1);

  // Middlewave xu ly loi tap trung
  // app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

  exitHook(() => {
    console.log("4. Disconnecting");
    CLOSE_DB();
  });
};

console.log("1. Connecting");
CONNECT_DB()
  .then(() => console.log("2. Connected"))
  .then(() => START_SERVER())
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
