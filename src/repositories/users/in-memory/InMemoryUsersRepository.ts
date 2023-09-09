import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
   private users: User[] = [];

   async create(data: Prisma.UserCreateInput) {
      const user: User = {
         id: randomUUID(),
         name: data.name,
         email: data.email,
         password: data.password,
         driver_licence: data.driver_licence,
         avatar: data.avatar ? data.avatar : null,
         admin: false,
         created_at: new Date(),
      };

      this.users.push(user);

      return user;
   }

   async saveAvatar(userId: string, avatar: string) {
      const userIndex = this.users.findIndex((item) => item.id === userId);

      this.users[userIndex].avatar = avatar;

      return this.users[userIndex];
   }

   async findByEmail(email: string) {
      const user = this.users.find((item) => item.email === email);

      return user ? user : null;
   }

   async findById(id: string) {
      const user = this.users.find((item) => item.id === id);

      return user ? user : null;
   }
}
