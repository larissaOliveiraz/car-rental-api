import { CategoriesRepository } from "../../repositories/implementation/CategoriesRepository";
import { ListCategoriesService } from "../cars/ListCategoriesService";

export function makeListCategoriesService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new ListCategoriesService(categoriesRepository);

   return service;
}
