import { Prisma, UserToken } from "@prisma/client";
import { IUsersTokensRepository } from "../IUsersTokensRepository";
import { randomUUID } from "crypto";

export class InMemoryUsersTokensRepository implements IUsersTokensRepository {
  private userTokens: UserToken[] = [];

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
