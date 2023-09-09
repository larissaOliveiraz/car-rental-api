import { CategoriesRepository } from "../../../repositories/cars/prisma/CategoriesRepository";
import { CreateCategoryService } from "../CreateCategoryService";

export function makeCreateCategoryService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new CreateCategoryService(categoriesRepository);

   return service;
}
