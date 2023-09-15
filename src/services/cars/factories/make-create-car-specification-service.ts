import { CarsRepository } from "../../../infra/prisma/repositories/cars/CarsRepository";
import { SpecificationsRepository } from "../../../infra/prisma/repositories/cars/SpecificationsRepository";
import { CreateCarSpecificationService } from "../CreateCarSpecificationService";

export function makeCreateCarSpecificationService() {
   const carsRepository = new CarsRepository();
   const specificactionsRepository = new SpecificationsRepository();
   const service = new CreateCarSpecificationService(
      carsRepository,
      specificactionsRepository
   );

   return service;
}
