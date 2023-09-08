import { CategoriesRepository } from "../../../repositories/cars/implementation/CategoriesRepository";
import { CreateCategoryService } from "../CreateCategoryService";

export function makeCreateCategoryService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new CreateCategoryService(categoriesRepository);

   return service;
}
