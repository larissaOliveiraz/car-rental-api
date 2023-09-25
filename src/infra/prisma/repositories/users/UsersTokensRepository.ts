import { Prisma } from "@prisma/client";
import { IUsersTokensRepository } from "../../../../repositories/users/IUsersTokensRepository";
import { prisma } from "../../../../database";

export class UsersTokensRepository implements IUsersTokensRepository {
  async findByUserAndRefreshToken(userId: string, refreshToken: string) {
    const userToken = await prisma.userToken.findFirst({
      where: {
        AND: [{ user_id: userId }, { refresh_token: refreshToken }],
      },
    });

    return userToken ? userToken : null;
  }

  async deleteById(userTokenId: string) {
    await prisma.userToken.delete({
      where: {
        id: userTokenId
      }
    })  
  }

  async create(data: Prisma.UserTokenUncheckedCreateInput) {
    const userToken = await prisma.userToken.create({
      data,
    });

    return userToken;
  }
}
