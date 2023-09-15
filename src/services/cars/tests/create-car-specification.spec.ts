import { CarNotFoundError } from "../../../errors/cars/CarNotFoundError";
import { SpecificationNotFoundError } from "../../../errors/cars/SpecificationNotFoundError";
import { InMemoryCarsRepository } from "../../../repositories/cars/in-memory/InMemoryCarsRepository";
import { InMemorySpecificationsRepository } from "../../../repositories/cars/in-memory/InMemorySpecificationsRepository";
import { CreateCarSpecificationService } from "../CreateCarSpecificationService";

let carsRepository: InMemoryCarsRepository;
let specificactionsRepository: InMemorySpecificationsRepository;
let service: CreateCarSpecificationService;

describe("Create Car Specification Service", () => {
   beforeEach(() => {
      carsRepository = new InMemoryCarsRepository();
      specificactionsRepository = new InMemorySpecificationsRepository();
      service = new CreateCarSpecificationService(
         carsRepository,
         specificactionsRepository
      );
   });

   it("should be able to add a specificaction to the car", async () => {
      const car = await carsRepository.create({
         name: "CarName",
         category_id: "category-01",
         description: "CarDescription",
         brand: "CarBrand",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlate",
      });

      const specification = await specificactionsRepository.create({
         name: "Specification One",
         description: "Spec description one",
      });

      const specificationsId = [specification.id];

      const carSpecification = await service.execute({
         carId: car.id,
         specificationsId,
      });

      expect(carSpecification).toEqual(
         expect.objectContaining({
            specifications: [specification.id],
         })
      );
   });

   it("should not be able to add a specification to nonexistent car", async () => {
      await expect(() =>
         service.execute({
            carId: "nonexistent-car",
            specificationsId: ["123"],
         })
      ).rejects.toBeInstanceOf(CarNotFoundError);
   });

   it("should not be able to add a nonexistent specification to a car", async () => {
      const car = await carsRepository.create({
         name: "CarName",
         category_id: "category-01",
         description: "CarDescription",
         brand: "CarBrand",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlate",
      });

      await expect(() =>
         service.execute({
            carId: car.id,
            specificationsId: ["nonexistent-spec"],
         })
      ).rejects.toBeInstanceOf(SpecificationNotFoundError);
   });
});
