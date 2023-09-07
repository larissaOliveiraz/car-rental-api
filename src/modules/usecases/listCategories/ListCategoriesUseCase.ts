import { ICategoriesRepository } from "../../cars/repositories/interfaces/ICategoriesRepository";

class ListCategoriesUseCase {
   constructor(private categoriesRepository: ICategoriesRepository) {}

   execute() {
      return this.categoriesRepository.list();
   }
}

export { ListCategoriesUseCase };
