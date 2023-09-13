import { Category, Prisma } from "@prisma/client";
import { ICategoriesRepository } from "../ICategoriesRepository";
import { randomUUID } from "node:crypto";

export class InMemoryCategoriesRepository implements ICategoriesRepository {
   public categories: Category[] = [];

   async create(data: Prisma.CategoryCreateInput) {
      const category = {
         id: data.id ? data.id : randomUUID(),
         name: data.name,
         description: data.description,
         created_at: new Date(),
      };

      this.categories.push(category);

      return category;
   }

   async findAll() {
      return this.categories;
   }

   async findByName(name: string) {
      const category = this.categories.find((item) => item.name === name);

      return category;
   }
}
