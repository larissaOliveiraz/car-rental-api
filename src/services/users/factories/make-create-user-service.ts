import { UsersRepository } from "../../../infra/prisma/repositories/users/UsersRepository";
import { CreateUserService } from "../CreateUserService";

export function makeCreateUserService() {
   const usersRepository = new UsersRepository();
   const service = new CreateUserService(usersRepository);

   return service;
}
