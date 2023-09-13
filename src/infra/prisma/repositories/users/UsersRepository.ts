import { Prisma } from "@prisma/client";
import { prisma } from "../../../../database";
import { IUsersRepository } from "../../../../repositories/users/IUsersRepository";

export class UsersRepository implements IUsersRepository {
   async findById(id: string) {
      const user = await prisma.user.findUnique({
         where: {
            id,
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
}
