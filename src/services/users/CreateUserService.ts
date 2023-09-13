import { hash } from "bcrypt";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";

interface IRequest {
   name: string;
   email: string;
   password: string;
   driver_license: string;
   avatar?: string;
}

export class CreateUserService {
   constructor(private usersRepository: IUsersRepository) {}

   async execute({ name, email, password, driver_license, avatar }: IRequest) {
      const password_hash = await hash(password, 6);

      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists) {
         throw new UserAlreadyExistsError();
      }

      const user = await this.usersRepository.create({
         name,
         email,
         password: password_hash,
         driver_license,
         avatar,
      });

      return user;
   }
}
