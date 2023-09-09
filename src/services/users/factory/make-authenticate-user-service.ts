import { UsersRepository } from "../../../repositories/users/prisma/UsersRepository";
import { AuthenticateUserService } from "../AuthenticateUserService";

export function makeAuthenticateUserService() {
   const usersRepository = new UsersRepository();
   const service = new AuthenticateUserService(usersRepository);

   return service;
}
