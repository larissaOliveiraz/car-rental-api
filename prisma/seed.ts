import {hash} from 'bcrypt'
import { prisma } from "../src/database";

async function main() {
  await prisma.user.create({
    data: {
      name: "Jurema",
      email: "jurema@admin.com",
      password: await hash("admin", 6),
      driver_license: "123456",
      admin: true
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })