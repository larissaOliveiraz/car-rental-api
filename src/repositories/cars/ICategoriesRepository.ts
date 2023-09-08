import { Category, Prisma } from "@prisma/client";

export interface ICategoriesRepository {
   create(data: Prisma.CategoryCreateInput): Promise<Category>;
   list(): Promise<Category[]>;
   findByName(name: string): Promise<Category | null>;
}
