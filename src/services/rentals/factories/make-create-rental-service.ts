import { CarsRepository } from "../../../infra/prisma/repositories/cars/CarsRepository";
import { RentalsRepository } from "../../../infra/prisma/repositories/rentals/RentalsRepository";
import { CreateRentalService } from "../CreateRentalService";

export function makeCreateRentalService() {
  const rentalsRepository = new RentalsRepository();
  const carsRepository = new CarsRepository();
  const service = new CreateRentalService(rentalsRepository, carsRepository);

  return service;
}
