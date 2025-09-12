"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
// import ApiError from "~/utils/ApiError";

var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            console.log("req.body: ", req.body);
            console.log("req.query: ", req.query);
            console.log("req.params: ", req.params);
            console.log("req.files: ", req.files);
            console.log("req.cookies: ", req.cookies);
            console.log("req.jwtDecoded: ", req.jwtDecoded);

            // Dieu huong du lieu sang tang Service

            // Co ket qua thi tra ve phia Client
            // throw new ApiError(StatusCodes.BAD_GATEWAY, "thien dev test error");
            res.status(_httpStatusCodes.StatusCodes.CREATED).json({
              message: "POST FROM CONTROLLER: API create new board"
            });
          } catch (error) {
            next(error);
            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            //   errors: error.message,
            // });
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createNew(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var boardController = exports.boardController = {
  createNew: createNew
};