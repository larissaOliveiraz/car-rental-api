import { CategoriesRepository } from "../../repositories/implementation/CategoriesRepository";
import { ImportCategoriesService } from "../cars/ImportCategoriesService";

export function makeImportCategoriesService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new ImportCategoriesService(categoriesRepository);

   return service;
}
