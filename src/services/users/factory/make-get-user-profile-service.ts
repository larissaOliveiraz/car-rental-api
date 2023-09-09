import { UsersRepository } from "@/repositories/users/prisma/UsersRepository";
import { GetUserProfileService } from "../GetUserProfileService";

export function makeGetUserProfileService() {
   const usersRepository = new UsersRepository();
   const service = new GetUserProfileService(usersRepository);

   return service;
}
