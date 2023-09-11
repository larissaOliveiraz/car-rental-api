import { Category, Prisma } from "@prisma/client";
import { ICategoriesRepository } from "@/repositories/cars/ICategoriesRepository";
import { prisma } from "@/database";

export class CategoriesRepository implements ICategoriesRepository {
   public categories: Category[] = [];

   async create(data: Prisma.CategoryCreateInput) {
      const category = await prisma.category.create({
         data,
      });

      return category;
   }

   async list() {
      const categories = await prisma.category.findMany();
      return categories;
   }

   async findByName(name: string) {
      const category = await prisma.category.findUnique({
         where: {
            name,
         },
      });

      return category;
   }
}
