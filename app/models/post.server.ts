import type { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(where: Prisma.PostWhereUniqueInput) {
  return prisma.post.findUnique({ where });
}
