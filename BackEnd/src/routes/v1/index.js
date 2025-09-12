import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "~/routes/v1/boardRouter";

const Router = express.Router();

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "API V1 are ready to use" });
});

Router.use("/boards", boardRoute);

export const APIs_V1 = Router;
