import { CarsRepository } from "../../../infra/prisma/repositories/cars/CarsRepository";
import { RentalsRepository } from "../../../infra/prisma/repositories/rentals/RentalsRepository";
import { ReturnRentalService } from "../ReturnRentalService";

export function makeReturnRentalService() {
  const rentalsRepository = new RentalsRepository();
  const carsRepository = new CarsRepository();
  const service = new ReturnRentalService(rentalsRepository, carsRepository);

  return service;
}
