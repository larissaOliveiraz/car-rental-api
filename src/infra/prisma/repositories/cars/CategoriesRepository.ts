import { Category, Prisma } from "@prisma/client";
import { prisma } from "../../../../database";
import { ICategoriesRepository } from "../../../../repositories/cars/ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
   public categories: Category[] = [];

   async findAll() {
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

   async create(data: Prisma.CategoryCreateInput) {
      const category = await prisma.category.create({
         data,
      });

      return category;
   }
}
