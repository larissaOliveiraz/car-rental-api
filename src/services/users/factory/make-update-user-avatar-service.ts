import { UsersRepository } from "../../../repositories/users/implementation/UsersRepository";
import { UpdateUserAvatarService } from "../UpdateUserAvatarService";

export function makeUpdateUserAvatarService() {
   const usersRepository = new UsersRepository();
   const service = new UpdateUserAvatarService(usersRepository);

   return service;
}