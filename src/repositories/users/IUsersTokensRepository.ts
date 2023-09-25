import { Prisma, UserToken } from "@prisma/client";

export interface IUsersTokensRepository {
  create(data: Prisma.UserTokenUncheckedCreateInput): Promise<UserToken>
}