import { UserNotFoundError } from "@/errors/UserNotFoundError";
import { IUsersRepository } from "@/repositories/users/IUsersRepository";

interface IRequest {
   id: string;
}

export class GetUserProfileService {
   constructor(private usersRepository: IUsersRepository) {}

   async execute({ id }: IRequest) {
      const user = await this.usersRepository.findById(id);

      if (!user) {
         throw new UserNotFoundError();
      }

      return user;
   }
}
