import { hash } from "bcrypt";
import { InvalidCredentialsError } from "@/errors/InvalidCredentialsError";
import { InMemoryUsersRepository } from "@/repositories/users/in-memory/InMemoryUsersRepository";
import { AuthenticateUserService } from "../AuthenticateUserService";

let usersRepository: InMemoryUsersRepository;
let service: AuthenticateUserService;

describe("Authenticate User Service", () => {
   beforeEach(async () => {
      usersRepository = new InMemoryUsersRepository();
      service = new AuthenticateUserService(usersRepository);
   });

   it("should be able to authenticate user", async () => {
      await usersRepository.create({
         name: "Fulano",
         email: "fulano@example.com",
         password: await hash("123456", 6),
         driver_license: "123456",
      });

      const { user, token } = await service.execute({
         email: "fulano@example.com",
         password: "123456",
      });

      expect(user.id).toEqual(expect.any(String));
      expect(token).toEqual(expect.any(String));
   });

   it("should not be able to authenticate user with wrong credentials", async () => {
      await usersRepository.create({
         name: "Fulano",
         email: "fulano@example.com",
         password: await hash("123456", 6),
         driver_license: "123456",
      });

      await expect(() =>
         service.execute({
            email: "wrong@example.com",
            password: "wrongpassword",
         })
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
   });
});
