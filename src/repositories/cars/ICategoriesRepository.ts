import { Category, Prisma } from "@prisma/client";

export interface ICategoriesRepository {
   findAll(): Promise<Category[]>;
   findByName(name: string): Promise<Category | null>;
   create(data: Prisma.CategoryCreateInput): Promise<Category>;
}
