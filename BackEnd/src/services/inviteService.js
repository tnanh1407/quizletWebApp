import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function generateToken(len = 18) {
  return crypto.randomBytes(len).toString("base64url");
}

export async function createInvite({
  classId,
  createdById,
  expiresInSeconds = null,
  singleUse = false,
}) {
  const token = generateToken();
  return prisma.inviteLink.create({
    data: {
      token,
      classId,
      createdById,
      singleUse,
      expiresAt: expiresInSeconds
        ? new Date(Date.now() + expiresInSeconds * 1000)
        : null,
    },
  });
}

export async function getInviteByToken(token) {
  return prisma.inviteLink.findUnique({
    where: { token },
    include: { class: true },
  });
}

export async function markInviteUsed(inviteId) {
  return prisma.inviteLink.update({
    where: { id: inviteId },
    data: { used: true },
  });
}

export async function addUserToClassIfNotExists(
  classId,
  userId,
  role = "member"
) {
  try {
    return await prisma.classMember.create({
      data: { classId, userId, role },
    });
  } catch (err) {
    if (err.code === "P2002") {
      return prisma.classMember.findFirst({ where: { classId, userId } });
    }
    throw err;
  }
}
