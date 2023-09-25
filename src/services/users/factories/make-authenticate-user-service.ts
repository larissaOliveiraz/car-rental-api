import { UsersRepository } from "../../../infra/prisma/repositories/users/UsersRepository";
import { UsersTokensRepository } from "../../../infra/prisma/repositories/users/UsersTokensRepository";
import { AuthenticateUserService } from "../AuthenticateUserService";

export function makeAuthenticateUserService() {
  const usersRepository = new UsersRepository();
  const usersTokensRepository = new UsersTokensRepository();
  const service = new AuthenticateUserService(
    usersRepository,
    usersTokensRepository
  );

  return service;
}
