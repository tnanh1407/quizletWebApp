"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIs_V1 = void 0;
var _express = _interopRequireDefault(require("express"));
var _httpStatusCodes = require("http-status-codes");
var _boardRouter = require("./boardRouter");
var Router = _express["default"].Router();
Router.get("/status", function (req, res) {
  res.status(_httpStatusCodes.StatusCodes.OK).json({
    message: "API V1 are ready to use"
  });
});
Router.use("/boards", _boardRouter.boardRoute);
var APIs_V1 = exports.APIs_V1 = Router;