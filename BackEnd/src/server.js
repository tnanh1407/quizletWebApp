import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "./config/mongodb.js";
import { env } from "~/config/environment.js";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware.js";
import cors from "cors";

const START_SERVER = () => {
  const app = express();

  // Cho phep tao frontend connect backend
  app.use(cors());

  app.use(express.json());

  app.use("/v1", APIs_V1);

  // Middlewave xu ly loi tap trung
  app.use(errorHandlingMiddleware);

  // app.get("/", (req, res) => {
  //   res.json({ message: "Xin chào từ Backend!" });
  // });

  app.get("/api/hello", (req, res) => {
    res.json({ message: "Xin chào từ Backend!" });
  });

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
