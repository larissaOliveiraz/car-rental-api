import { CarsRepository } from "../../../infra/prisma/repositories/cars/CarsRepository";
import { CreateCarService } from "../CreateCarService";

export function makeCreateCarService() {
   const carsRepository = new CarsRepository();
   const service = new CreateCarService(carsRepository);

   return service;
}
