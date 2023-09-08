import { CategoriesRepository } from "../../../repositories/cars/implementation/CategoriesRepository";
import { ImportCategoriesService } from "../ImportCategoriesService";

export function makeImportCategoriesService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new ImportCategoriesService(categoriesRepository);

   return service;
}
