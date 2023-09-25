import { UsersTokensRepository } from "../../../infra/prisma/repositories/users/UsersTokensRepository";
import { RefreshTokenService } from "../RefreshTokenService";

export function makeRefreshTokenService() {
  const usersTokensRepository = new UsersTokensRepository();
  const service = new RefreshTokenService(usersTokensRepository);

  return service;
}
