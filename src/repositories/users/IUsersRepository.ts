import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
   create(data: Prisma.UserCreateInput): Promise<User>;
   saveAvatar(userId: string, avatar: string): Promise<User>;
   findByEmail(email: string): Promise<User | null>;
   findById(id: string): Promise<User | null>;
}
