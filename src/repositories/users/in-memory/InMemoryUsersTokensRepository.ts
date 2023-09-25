import { Prisma, UserToken } from "@prisma/client";
import { IUsersTokensRepository } from "../IUsersTokensRepository";
import { randomUUID } from "crypto";

export class InMemoryUsersTokensRepository implements IUsersTokensRepository {
  private userTokens: UserToken[] = [];

  async findByUserAndRefreshToken(userId: string, refreshToken: string) {
    const userToken = this.userTokens.find(
      (item) => item.user_id === userId && item.refresh_token === refreshToken
    );

    return userToken ? userToken : null;
  }

  async deleteById(userTokenId: string) {
    const userTokenIndex = this.userTokens.findIndex(item => item.id === userTokenId)

    this.userTokens.splice(userTokenIndex, 1)
  }

  async create(data: Prisma.UserTokenUncheckedCreateInput) {
    const newUserToken: UserToken = {
      id: randomUUID(),
      refresh_token: data.refresh_token,
      expires_at: data.expires_at as Date,
      created_at: new Date(),
      user_id: data.user_id,
    };

    this.userTokens.push(newUserToken);

    return newUserToken;
  }
}
