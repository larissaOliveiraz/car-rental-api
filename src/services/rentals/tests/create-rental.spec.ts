import dayjs from "dayjs";
import { CarNotAvailableError } from "../../../errors/rentals/CarNotAvailableError";
import { UserNotAvailableError } from "../../../errors/rentals/UserNotAvailableError";
import { InMemoryRentalsRepository } from "../../../repositories/rentals/in-memory/InMemoryRentalsRepository";
import { CreateRentalService } from "../CreateRentalService";
import { MinimumRentalTimeError } from "../../../errors/rentals/MinimumRentalTimeError";
import { InMemoryCarsRepository } from "../../../repositories/cars/in-memory/InMemoryCarsRepository";

let rentalsRepository: InMemoryRentalsRepository;
let carsRepository: InMemoryCarsRepository;
let service: CreateRentalService;

describe("Create Rental Service", () => {
   const returnDate24Hours = dayjs().add(1, "day").toDate();

   beforeEach(() => {
      rentalsRepository = new InMemoryRentalsRepository();
      carsRepository = new InMemoryCarsRepository()
      service = new CreateRentalService(rentalsRepository, carsRepository);
   });

   it("should be able to create a rental", async () => {
      const rental = await service.execute({
         carId: "car-01",
         userId: "user-01",
         expectedReturnDate: returnDate24Hours,
      });

      expect(rental.id).toEqual(expect.any(String));
   });

   it("should not be able to create a rental with a car that's not available", async () => {
      await service.execute({
         carId: "car-01",
         userId: "user-01",
         expectedReturnDate: returnDate24Hours,
      });

      await expect(() =>
         service.execute({
            carId: "car-01",
            userId: "user-02",
            expectedReturnDate: returnDate24Hours,
         })
      ).rejects.toBeInstanceOf(CarNotAvailableError);
   });

   it("should not be able to create a rental if the user if already renting another car", async () => {
      await service.execute({
         carId: "car-01",
         userId: "user-01",
         expectedReturnDate: returnDate24Hours,
      });

      await expect(() =>
         service.execute({
            carId: "car-02",
            userId: "user-01",
            expectedReturnDate: returnDate24Hours,
         })
      ).rejects.toBeInstanceOf(UserNotAvailableError);
   });

   it("should not be able to create a rental if the expected return date is in less than 24 hours", async () => {
      const invalidReturnDate = dayjs().add(1, "hours").toDate();

      await expect(() =>
         service.execute({
            carId: "car-01",
            userId: "user-01",
            expectedReturnDate: invalidReturnDate,
         })
      ).rejects.toBeInstanceOf(MinimumRentalTimeError);
   });
});
