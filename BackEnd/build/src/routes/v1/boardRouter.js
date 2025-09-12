"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _httpStatusCodes = require("http-status-codes");
var _boardValidation = require("../../validations/boardValidation");
var _boardController = require("../../controllers/boardController");
var Router = _express["default"].Router();
Router.route("/:id").get(function (req, res) {
  res.status(_httpStatusCodes.StatusCodes.OK).json({
    message: "Note: API get list board"
  });
}).post(_boardValidation.boardValidation.createNew, _boardController.boardController.createNew);
var boardRoute = exports.boardRoute = Router;