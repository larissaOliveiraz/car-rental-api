import { InMemoryCarsRepository } from "../../../repositories/cars/in-memory/InMemoryCarsRepository";
import { ListCarsService } from "../ListCarsService";

let carsRepository: InMemoryCarsRepository;
let service: ListCarsService;

describe("List Cars Service", () => {
   beforeEach(() => {
      carsRepository = new InMemoryCarsRepository();
      service = new ListCarsService(carsRepository);
   });

   it("should be able to list cars", async () => {
      await carsRepository.create({
         name: "CarName",
         category_id: "category-01",
         description: "CarDescription",
         brand: "CarBrand",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlate",
      });

      const cars = await service.execute({});

      expect(cars).toHaveLength(1);
      expect(cars).toEqual([
         expect.objectContaining({
            name: "CarName",
         }),
      ]);
   });

   it("should not be able to list cars that are not available", async () => {
      await carsRepository.create({
         name: "CarNotAvailable",
         category_id: "categoryId",
         description: "CarDescription",
         brand: "CarBrand",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlate",
         available: false,
      });

      const cars = await service.execute({});

      expect(cars).toHaveLength(0);
      expect(cars).toEqual([]);
   });

   it("should be able to list cars based on category", async () => {
      await carsRepository.create({
         name: "Car One",
         category_id: "category-01",
         description: "Description One",
         brand: "Brand One",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlateOne",
      });

      await carsRepository.create({
         name: "Car Two",
         category_id: "category-02",
         description: "Description Two",
         brand: "Brand Two",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlateTwo",
      });

      const cars = await service.execute({ categoryId: "category-01" });

      expect(cars).toHaveLength(1);
      expect(cars).toEqual([
         expect.objectContaining({
            name: "Car One",
         }),
      ]);
   });

   it("should be able to list cars based on name", async () => {
      await carsRepository.create({
         name: "Car One",
         category_id: "category-01",
         description: "Description One",
         brand: "Brand One",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlateOne",
      });

      await carsRepository.create({
         name: "Car Two",
         category_id: "category-01",
         description: "Description Two",
         brand: "Brand Two",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlateTwo",
      });

      const cars = await service.execute({ name: "Car One" });

      expect(cars).toHaveLength(1);
      expect(cars).toEqual([
         expect.objectContaining({
            name: "Car One",
         }),
      ]);
   });

   it("should be able to list cars based on brand", async () => {
      await carsRepository.create({
         name: "Car One",
         category_id: "category-01",
         description: "Description One",
         brand: "Brand One",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlateOne",
      });

      await carsRepository.create({
         name: "Car Two",
         category_id: "category-01",
         description: "Description Two",
         brand: "Brand Two",
         daily_rate: 5,
         fine_amount: 100,
         license_plate: "LicensePlateTwo",
      });

      const cars = await service.execute({ brand: "Brand Two" });

      expect(cars).toHaveLength(1);
      expect(cars).toEqual([
         expect.objectContaining({
            name: "Car Two",
         }),
      ]);
   });
});
