import dayjs from "dayjs";
import { InMemoryCarsRepository } from "../../../repositories/cars/in-memory/InMemoryCarsRepository";
import { InMemoryRentalsRepository } from "../../../repositories/rentals/in-memory/InMemoryRentalsRepository";
import { ReturnRentalService } from "../ReturnRentalService";
import { RentalNotFoundError } from "../../../errors/rentals/RentalNotFoundErrorError";

let rentalsRepository: InMemoryRentalsRepository;
let carsRepository: InMemoryCarsRepository;
let service: ReturnRentalService;

describe("Return Rental Service", () => {
  beforeEach(() => {
    rentalsRepository = new InMemoryRentalsRepository();
    carsRepository = new InMemoryCarsRepository();
    service = new ReturnRentalService(rentalsRepository, carsRepository);
  });

  const validReturnDate = dayjs().add(1, "days").toDate();

  it("should be able to return rental", async () => {
    await carsRepository.create({
      id: "car-01",
      name: "CarName",
      category_id: "category-01",
      description: "CarDescription",
      brand: "CarBrand",
      daily_rate: 50,
      fine_amount: 10,
      license_plate: "LicensePlate",
    });

    await rentalsRepository.create({
      id: "rental-01",
      car_id: "car-01",
      user_id: "user-01",
      expected_return_date: validReturnDate,
    });

    const rentalReturned = await service.execute({
      rentalId: "rental-01",
      userId: "user-01",
    });

    expect(rentalReturned.end_date).toEqual(expect.any(Date));
  });

  it("should not be able to return rental that does not exist", async () => {
    await expect(() =>
      service.execute({
        rentalId: "rental-01",
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(RentalNotFoundError);
  });
});
