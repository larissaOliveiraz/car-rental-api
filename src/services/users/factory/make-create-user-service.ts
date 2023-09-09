import { UsersRepository } from "@/repositories/users/prisma/UsersRepository";
import { CreateUserService } from "../CreateUserService";

export function makeCreateUserService() {
   const usersRepository = new UsersRepository();
   const service = new CreateUserService(usersRepository);

   return service;
}
