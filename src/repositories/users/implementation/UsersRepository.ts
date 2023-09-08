import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";
import { prisma } from "../../../database";

export class UsersRepository implements IUsersRepository {
   async create(data: Prisma.UserCreateInput) {
      const user = await prisma.user.create({
         data,
      });

      return user;
   }
}
