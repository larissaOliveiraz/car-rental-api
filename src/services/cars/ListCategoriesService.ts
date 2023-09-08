import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoriesService {
   constructor(private categoriesRepository: ICategoriesRepository) {}

   async execute() {
      return await this.categoriesRepository.list();
   }
}
