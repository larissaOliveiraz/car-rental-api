import { RentalsRepository } from "../../../infra/prisma/repositories/rentals/RentalsRepository";
import { CreateRentalService } from "../CreateRentalService";

export function makeCreateRentalService() {
   const rentalsRepository = new RentalsRepository();
   const service = new CreateRentalService(rentalsRepository);

   return service;
}
