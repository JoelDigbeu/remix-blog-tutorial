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
    {
      slug: "my-first-post",
      title: "My First Post",
      markdown: `
# This is my first post

Isn't it great?
    `.trim(),
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      markdown: `
# 90s Mixtape

- I wish (Skee-Lo)
- This Is How We Do It (Montell Jordan)
- Everlong (Foo Fighters)
- Ms. Jackson (Outkast)
- Interstate Love Song (Stone Temple Pilots)
- Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
- Just a Friend (Biz Markie)
- The Man Who Sold The World (Nirvana)
- Semi-Charmed Life (Third Eye Blind)
- ...Baby One More Time (Britney Spears)
- Better Man (Pearl Jam)
- It's All Coming Back to Me Now (Céline Dion)
- This Kiss (Faith Hill)
- Fly Away (Lenny Kravits)
- Scar Tissue (Red Hot Chili Peppers)
- Santa Monica (Everclear)
- C'mon N' Ride it (Quad City DJ's)
    `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
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
