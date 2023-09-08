import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { UserNotFoundError } from "./errors/UserNotFoundError";

interface IRequest {
   userId: string;
}

export class GetUserProfileService {
   constructor(private usersRepository: IUsersRepository) {}

   async execute({ userId }: IRequest) {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
         throw new UserNotFoundError();
      }

      return user;
   }
}
