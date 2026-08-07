import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin",
    },

    update: {
      name: "Ramakant Rao",
      password,
      role: UserRole.ADMIN,
      active: true,
    },

    create: {
      name: "Ramakant Rao",
      email: "admin",
      password,
      role: UserRole.ADMIN,
      active: true,
    },
  });

  console.log("✅ Admin User Created Successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });