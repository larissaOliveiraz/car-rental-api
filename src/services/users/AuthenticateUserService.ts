import { compare } from "bcrypt";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { UserNotFoundError } from "./errors/UserNotFoundError";
import { sign } from "jsonwebtoken";

interface IRequest {
   email: string;
   password: string;
}

export class AuthenticateUserService {
   constructor(private usersRepository: IUsersRepository) {}

   async execute({ email, password }: IRequest) {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
         throw new UserNotFoundError();
      }

      const passwordIsCorrect = await compare(password, user.password);

      if (!passwordIsCorrect) {
         throw new UserNotFoundError();
      }

      const token = sign({}, "d04e45099b5a1ef42dda18aae6e5d96f", {
         subject: user.id,
         expiresIn: "1d",
      });

      return {
         user,
         token,
      };
   }
}