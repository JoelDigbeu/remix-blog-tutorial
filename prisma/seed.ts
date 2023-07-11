import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const user = await addDefaultUser();
  await addDefaulNotes(user);
  await addDefaultPosts();

  console.log(`Database has been seeded. 🌱`);
}

async function addDefaultUser() {
  const email = "joeldigbeu@arolitec.com";
  const password = "Azertyuiop1@";

  const [user] = await prisma.user.findMany({ where: { email } });

  if (user) return user;

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

async function addDefaultPosts() {
  const posts = [
    { slug: "post-1", title: "Post 1" },
    { slug: "post-2", title: "Post 2" },
    { slug: "post-3", title: "Post 3" },
  ];

  for (const post of posts) {
    prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
}

async function addDefaulNotes(user: any) {
  return prisma.note.createMany({
    data: [
      {
        title: "My first note",
        body: "Hello, world!",
        userId: user.id,
      },
      {
        title: "My second note",
        body: "Hello, world!",
        userId: user.id,
      },
    ],
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
