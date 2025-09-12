import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "./config/mongodb.js";
import { env } from "~/config/environment.js";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware.js";

const START_SERVER = () => {
  const app = express();

  app.use(express.json());

  app.use("/v1", APIs_V1);
  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
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
