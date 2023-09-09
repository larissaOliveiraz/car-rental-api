import { IUsersRepository } from "@/repositories/users/IUsersRepository";
import { deleteFile } from "@/utils/file";

interface IRequest {
   userId: string;
   avatarFile: string;
}

export class UpdateUserAvatarService {
   constructor(private usersRepository: IUsersRepository) {}

   async execute({ userId, avatarFile }: IRequest) {
      const user = await this.usersRepository.saveAvatar(userId, avatarFile);

      if (user.avatar) {
         await deleteFile(`./tmp/avatar/${user.avatar}`);
      }

      return user;
   }
}
