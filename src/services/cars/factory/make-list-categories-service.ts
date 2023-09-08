import { CategoriesRepository } from "../../../repositories/cars/implementation/CategoriesRepository";
import { ListCategoriesService } from "../ListCategoriesService";

export function makeListCategoriesService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new ListCategoriesService(categoriesRepository);

   return service;
}
