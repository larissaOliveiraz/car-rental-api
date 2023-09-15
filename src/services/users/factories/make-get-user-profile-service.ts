import { UsersRepository } from "../../../infra/prisma/repositories/users/UsersRepository";
import { GetUserProfileService } from "../GetUserProfileService";

export function makeGetUserProfileService() {
   const usersRepository = new UsersRepository();
   const service = new GetUserProfileService(usersRepository);

   return service;
}
