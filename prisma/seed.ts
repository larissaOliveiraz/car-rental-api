import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function create() {
   await prisma.user.create({
      data: {
         name: "Jurema",
         email: "jurema@admin.com",
         password: await hash("admin", 6),
         driver_license: "lmn456",
         admin: true,
      },
   });
}

create()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (error) => {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
   });
