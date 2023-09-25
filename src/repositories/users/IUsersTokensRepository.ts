import { Prisma, UserToken } from "@prisma/client";

export interface IUsersTokensRepository {
  findByUserAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | null>;
  deleteById(userTokenId: string): Promise<void>
  create(data: Prisma.UserTokenUncheckedCreateInput): Promise<UserToken>;
}
