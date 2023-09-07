import { Category } from "../model/Category";
import {
   ICategoriesRepository,
   ICreateCategoryDTO,
} from "./interfaces/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
   private categories: Category[];

   private static INSTANCE: CategoriesRepository;

   private constructor() {
      this.categories = [];
   }

   public static getInstance(): CategoriesRepository {
      if (!CategoriesRepository.INSTANCE) {
         CategoriesRepository.INSTANCE = new CategoriesRepository();
      }

      return CategoriesRepository.INSTANCE;
   }

   create({ name, description }: ICreateCategoryDTO) {
      const category = new Category();

      Object.assign(category, {
         name,
         description,
         created_at: new Date(),
      });

      this.categories.push(category);

      console.log(this.categories);
   }

   list() {
      console.log(this.categories);
      return this.categories;
   }

   findByName(name: string) {
      const category = this.categories.find((item) => item.name === name);

      return category;
   }
}

export { CategoriesRepository };
