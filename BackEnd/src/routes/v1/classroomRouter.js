import express from "express";
import { classroomController } from "../../controllers/classroomController.js";

const router = express.Router();

router.get("/", classroomController.getAll);
router.post("/", classroomController.createNew);
router.put("/:id", classroomController.updateById);
router.delete("/:id", classroomController.deleteById);
router.get("/:id", classroomController.getById);

router.patch("/:id/flashcards", classroomController.addFlashcards);
router.delete(
  "/:classroomId/flashcards/:flashcardId",
  classroomController.removeFlashcard
);
router.patch("/:id/folders", classroomController.addFolders);
router.delete(
  "/:classroomId/folders/:folderId",
  classroomController.removeFlashcard
);

router.patch("/:id/members", classroomController.addMember); // body: { user_id, username, role }
router.delete(
  "/:classroomId/members/:userId",
  classroomController.removeMember
);
router.post("/:id/members", classroomController.addMemberByEmail);
// Gửi yêu cầu tham gia lớp
router.post("/:id/join-request", classroomController.requestJoin);

// Duyệt hoặc từ chối yêu cầu tham gia
router.patch("/:id/handle-join", classroomController.handleJoinRequest);
router.post("/:id/cancel-request", classroomController.cancelJoinRequest);
export const classroomRoutes = router;
