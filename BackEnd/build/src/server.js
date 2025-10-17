import express from "express";
import cors from "cors";
// import "../src/register.js";
import exitHook from "async-exit-hook";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "./config/mongodb.js";
import { env } from "../src/config/environment.js";
import { APIs_V1 } from "../src/routes/v1/index.js";
import { API_ROOT } from "./utils/constants.js";
import { corsOptions } from "./config/cors.js";
// import { errorHandlingMiddleware } from "../src/middlewares/errorHandlingMiddleware.js";

const START_SERVER = () => {
  const app = express();

  // Cho phep tao frontend connect backend
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use("/api/v1", APIs_V1);

  // Middlewave xu ly loi tap trung
  // app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === "production") {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`3. Production: Hello ${env.AUTHOR}, I am running at Port: ${process.env.PORT}`);
    });
  } else {
    app.listen(env.APP_PORT, env.APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`3. Local: Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`);
    });
  }
  exitHook(() => {
    console.log("4. Disconnecting");
    CLOSE_DB();
  });
};
console.log("1. Connecting");
CONNECT_DB().then(() => console.log("2. Connected")).then(() => START_SERVER()).catch(error => {
  console.error(error);
  process.exit(0);
});