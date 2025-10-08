// import { PrismaClient } from "@prisma/client";
// import * as inviteService from "../services/inviteService.js";

// const prisma = new PrismaClient();

// export async function createInviteHandler(req, res) {
//   const classId = Number(req.params.classId);
//   const { expiresInSeconds, singleUse } = req.body;
//   const userId = req.user.id;

//   const targetClass = await prisma.class.findUnique({ where: { id: classId } });
//   if (!targetClass)
//     return res.status(404).json({ error: "Class không tồn tại" });
//   if (targetClass.ownerId !== userId)
//     return res.status(403).json({ error: "Không có quyền tạo mã mời" });

//   const invite = await inviteService.createInvite({
//     classId,
//     createdById: userId,
//     expiresInSeconds,
//     singleUse,
//   });
//   const link = `${process.env.FRONTEND_URL}/join?token=${invite.token}`;

//   res.json({ invite, link });
// }

// export async function joinByTokenHandler(req, res) {
//   const token = String(req.query.token || "");
//   const user = req.user;

//   if (!token) return res.status(400).json({ error: "Thiếu token" });

//   const invite = await inviteService.getInviteByToken(token);
//   if (!invite) return res.status(404).json({ error: "Mã mời không hợp lệ" });
//   if (invite.expiresAt && invite.expiresAt < new Date())
//     return res.status(410).json({ error: "Mã mời đã hết hạn" });
//   if (invite.singleUse && invite.used)
//     return res.status(410).json({ error: "Mã mời đã được sử dụng" });

//   if (!user)
//     return res.status(401).json({ error: "Cần đăng nhập", requireLogin: true });

//   await inviteService.addUserToClassIfNotExists(
//     invite.classId,
//     user.id,
//     "member"
//   );
//   if (invite.singleUse) await inviteService.markInviteUsed(invite.id);

//   res.json({ success: true, classId: invite.classId });
// }
