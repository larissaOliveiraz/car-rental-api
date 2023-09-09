import { CategoryAlreadyExistsError } from "../../../errors/CategoryAlreadyExistsError";
import { InMemoryCategoriesRepository } from "../../../repositories/cars/in-memory/InMemoryCategoriesRepository";
import { CreateCategoryService } from "../CreateCategoryService";

let categoriesRepository: InMemoryCategoriesRepository;
let service: CreateCategoryService;

describe("Create Car Category Service", () => {
   beforeEach(async () => {
      categoriesRepository = new InMemoryCategoriesRepository();
      service = new CreateCategoryService(categoriesRepository);
   });

   it("should be able to create a car category", async () => {
      const category = await service.execute({
         name: "SUV",
         description: "SUV car",
      });

      expect(category.id).toEqual(expect.any(String));
   });

   it("should not be able to create category if the name already exists", async () => {
      await service.execute({
         name: "SUV",
         description: "SUV car",
      });

      await expect(() =>
         service.execute({
            name: "SUV",
            description: "SUV car",
         })
      ).rejects.toBeInstanceOf(CategoryAlreadyExistsError);
   });
});
