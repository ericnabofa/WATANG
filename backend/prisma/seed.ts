import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const packSizes = [
    { name: "Single Item" },
    { name: "6-pack" },
    { name: "12-pack" },
    { name: "24-pack" }
  ];

  for (const pack of packSizes) {
    await prisma.packSize.upsert({
      where: { name: pack.name },
      update: {},
      create: pack,
    });
  }

  console.log("✅ Pack sizes seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
