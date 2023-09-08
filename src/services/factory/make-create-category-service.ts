import { CategoriesRepository } from "../../repositories/implementation/CategoriesRepository";
import { CreateCategoryService } from "../cars/CreateCategoryService";

export function makeCreateCategoryService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new CreateCategoryService(categoriesRepository);

   return service;
}
