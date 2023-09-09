import { UsersRepository } from "../../../repositories/users/implementation/UsersRepository";
import { AuthenticateUserService } from "../AuthenticateUserService";

export function makeAuthenticateUserService() {
   const usersRepository = new UsersRepository();
   const service = new AuthenticateUserService(usersRepository);

   return service;
}
