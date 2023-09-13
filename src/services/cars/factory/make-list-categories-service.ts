import { CategoriesRepository } from "../../../infra/prisma/repositories/cars/CategoriesRepository";
import { ListCategoriesService } from "../ListCategoriesService";

export function makeListCategoriesService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new ListCategoriesService(categoriesRepository);

   return service;
}
