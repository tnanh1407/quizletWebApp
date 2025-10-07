// import { Router } from "express";
// import { body, param, query } from "express-validator";
// import {
//   createInviteHandler,
//   joinByTokenHandler,
// } from "../controllers/invite.controller.js";
// import { validateRequest } from "../middlewares/validateRequest.js";
// import { requireAuth } from "../middlewares/auth.js";

// const router = Router();

// router.post(
//   "/classes/:classId/invite",
//   requireAuth,
//   param("classId").isInt(),
//   body("expiresInSeconds").optional().isInt({ min: 1 }),
//   body("singleUse").optional().isBoolean(),
//   validateRequest,
//   createInviteHandler
// );

// router.get(
//   "/join",
//   query("token").isString().notEmpty(),
//   validateRequest,
//   joinByTokenHandler
// );

// export default inviteRouter = router;
