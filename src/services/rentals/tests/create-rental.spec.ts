import dayjs from "dayjs";
import { CarNotAvailableError } from "../../../errors/rentals/CarNotAvailableError";
import { UserNotAvailableError } from "../../../errors/rentals/UserNotAvailableError";
import { InMemoryRentalsRepository } from "../../../repositories/rentals/in-memory/InMemoryRentalsRepository";
import { CreateRentalService } from "../CreateRentalService";
import { MinimumRentalTimeError } from "../../../errors/rentals/MinimumRentalTimeError";

let rentalsRepository: InMemoryRentalsRepository;
let service: CreateRentalService;

describe("Create Rental Service", () => {
   const returnDate24Hours = dayjs().add(1, "day").toDate();

   beforeEach(() => {
      rentalsRepository = new InMemoryRentalsRepository();
      service = new CreateRentalService(rentalsRepository);
   });

   it("should be able to create a rental", async () => {
      const rental = await service.execute({
         carId: "car-01",
         userId: "user-01",
         expectedReturn: returnDate24Hours,
      });

      expect(rental.id).toEqual(expect.any(String));
   });

   it("should not be able to create a rental with a not available car", async () => {
      await service.execute({
         carId: "car-01",
         userId: "user-01",
         expectedReturn: returnDate24Hours,
      });

      await expect(() =>
         service.execute({
            carId: "car-01",
            userId: "user-02",
            expectedReturn: returnDate24Hours,
         })
      ).rejects.toBeInstanceOf(CarNotAvailableError);
   });

   it("should not be able to create a rental if the user if already renting another car", async () => {
      await service.execute({
         carId: "car-01",
         userId: "user-01",
         expectedReturn: returnDate24Hours,
      });

      await expect(() =>
         service.execute({
            carId: "car-02",
            userId: "user-01",
            expectedReturn: returnDate24Hours,
         })
      ).rejects.toBeInstanceOf(UserNotAvailableError);
   });

   it("should not be able to create a rental if the expected return date is in less than 24 hours", async () => {
      const invalidReturnDate = dayjs().add(1, "hours").toDate();

      await expect(() =>
         service.execute({
            carId: "car-01",
            userId: "user-01",
            expectedReturn: invalidReturnDate,
         })
      ).rejects.toBeInstanceOf(MinimumRentalTimeError);
   });
});
