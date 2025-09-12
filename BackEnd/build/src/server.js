"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _asyncExitHook = _interopRequireDefault(require("async-exit-hook"));
var _mongodb = require("./config/mongodb.js");
var _environment = require("./config/environment.js");
var _v = require("./routes/v1");
var _errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware.js");
var START_SERVER = function START_SERVER() {
  var app = (0, _express["default"])();
  app.use(_express["default"].json());
  app.use("/v1", _v.APIs_V1);

  // Middlewave xu ly loi tap trung
  app.use(_errorHandlingMiddleware.errorHandlingMiddleware);

  // app.get("/", async (req, res) => {
  //   res.end("<h1>Hello World!</h1><hr>");
  // });

  app.listen(_environment.env.APP_PORT, _environment.env.APP_HOST, function () {
    // eslint-disable-next-line no-console
    console.log("3. Hello ".concat(_environment.env.AUTHOR, ", I am running at ").concat(_environment.env.APP_HOST, ":").concat(_environment.env.APP_PORT, "/"));
  });
  (0, _asyncExitHook["default"])(function () {
    console.log("4. Disconnecting");
    (0, _mongodb.CLOSE_DB)();
  });
};

// (async () => {
//   try {
//     console.log("1. Connecting");
//     await CONNECT_DB;
//     console.log("2. Connected");
//     START_SERVER();
//   } catch (error) {
//     console.error(error);
//     process.exit(0);
//   }
// })();

console.log("1. Connecting");
(0, _mongodb.CONNECT_DB)().then(function () {
  return console.log("2. Connected");
}).then(function () {
  return START_SERVER();
})["catch"](function (error) {
  console.error(error);
  process.exit(0);
});