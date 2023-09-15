import { InMemoryCarsRepository } from "../../../repositories/cars/in-memory/InMemoryCarsRepository";
import { CreateCarService } from "../CreateCarService";
import { InMemoryCategoriesRepository } from "../../../repositories/cars/in-memory/InMemoryCategoriesRepository";
import { CarAlreadyExistsError } from "../../../errors/cars/CarAlreadyExistsError";

let carsRepository: InMemoryCarsRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let service: CreateCarService;

let category: { id: string; name: string; description: string };

describe("Create Car Service", () => {
   beforeEach(async () => {
      carsRepository = new InMemoryCarsRepository();
      categoriesRepository = new InMemoryCategoriesRepository();
      service = new CreateCarService(carsRepository);

      category = await categoriesRepository.create({
         id: "category-01",
         name: "CategoryName",
         description: "CategoryDescription",
      });
   });

   it("should be able to create a car", async () => {
      const car = await service.execute({
         name: "CarName",
         category_id: category.id,
         description: "CarDescription",
         brand: "CarBrand",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlate",
      });

      expect(car.id).toEqual(expect.any(String));
   });

   it("should not be able to create two cars with the same license plate", async () => {
      await service.execute({
         name: "CarName",
         category_id: category.id,
         description: "CarDescription",
         brand: "CarBrand",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "same-license-plate",
      });

      await expect(() =>
         service.execute({
            name: "CarName",
            category_id: category.id,
            description: "CarDescription",
            brand: "CarBrand",
            daily_rate: 5,
            fine_amount: 100,
            license_plate: "same-license-plate",
         })
      ).rejects.toBeInstanceOf(CarAlreadyExistsError);
   });

   it("should be able to create only available cars", async () => {
      const car = await service.execute({
         name: "CarName",
         category_id: category.id,
         description: "CarDescription",
         brand: "CarBrand",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlate",
      });

      expect(car.available).toBe(true);
   });
});
