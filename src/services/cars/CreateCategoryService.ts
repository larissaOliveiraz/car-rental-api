import { ICategoriesRepository } from "../../repositories/cars/ICategoriesRepository";
import { CategoryAlreadyExistsError } from "./errors/CategoryAlreadyExistsError";

interface IRequest {
   name: string;
   description: string;
}

export class CreateCategoryService {
   constructor(private categoriesRepository: ICategoriesRepository) {}

   async execute({ name, description }: IRequest) {
      const categoryAlreadyExists = await this.categoriesRepository.findByName(
         name
      );

      if (categoryAlreadyExists) {
         throw new CategoryAlreadyExistsError();
      }

      const category = await this.categoriesRepository.create({
         name,
         description,
      });

      return category;
   }
}
