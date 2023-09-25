import { Prisma } from "@prisma/client";
import { IUsersTokensRepository } from "../../../../repositories/users/IUsersTokensRepository";
import { prisma } from "../../../../database";

export class UsersTokensRepository implements IUsersTokensRepository {
  async create(data: Prisma.UserTokenUncheckedCreateInput) {
    const userToken = await prisma.userToken.create({
      data
    })
    
    return userToken;
  }
}