import { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getPosts(): Promise<Post[]> {
  return prisma.post.findMany();
}
