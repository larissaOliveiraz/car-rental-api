import { Prisma } from "@prisma/client";
import { IUsersRepository } from "@/repositories/users/IUsersRepository";
import { prisma } from "@/database";

export class UsersRepository implements IUsersRepository {
   async create(data: Prisma.UserCreateInput) {
      const user = await prisma.user.create({
         data,
      });

      return user;
   }

   async saveAvatar(userId: string, avatar: string) {
      const user = await prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            avatar,
         },
      });

      return user;
   }

   async findByEmail(email: string) {
      const user = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      return user;
   }

   async findById(id: string) {
      const user = await prisma.user.findUnique({
         where: {
            id,
         },
      });

      return user;
   }
}
