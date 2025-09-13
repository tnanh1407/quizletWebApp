import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "~/routes/v1/boardRouter";
import { cardRoute } from "~/routes/v1/cardRouter";

const Router = express.Router();

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "API V1 are ready to use" });
});

Router.use("/boards", boardRoute);
Router.use("/cards", cardRoute);

export const APIs_V1 = Router;
