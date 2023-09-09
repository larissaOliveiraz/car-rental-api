import { CategoriesRepository } from "@/repositories/cars/prisma/CategoriesRepository";
import { ImportCategoriesService } from "../ImportCategoriesService";

export function makeImportCategoriesService() {
   const categoriesRepository = new CategoriesRepository();
   const service = new ImportCategoriesService(categoriesRepository);

   return service;
}
