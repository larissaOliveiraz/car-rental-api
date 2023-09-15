import { CategoriesRepository } from "../../../infra/prisma/repositories/cars/CategoriesRepository";
import { CreateCategoryService } from "../CreateCategoryService";

export function makeCreateCategoryService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new CreateCategoryService(categoriesRepository);

   return service;
}
