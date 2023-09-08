import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
   name: string;
   username: string;
   email: string;
   password: string;
   driver_licence: string;
}

export class CreateUserService {
   constructor(private usersRepository: IUsersRepository) {}

   async execute({
      name,
      username,
      email,
      password,
      driver_licence,
   }: IRequest) {
      const user = await this.usersRepository.create({
         name,
         username,
         email,
         password,
         driver_licence,
      });

      return user;
   }
}
