import { CarsRepository } from "../../../infra/prisma/repositories/cars/CarsRepository";
import { ListCarsService } from "../ListCarsService";

export function makeListCarsService() {
   const carsRepository = new CarsRepository();
   const service = new ListCarsService(carsRepository);

   return service;
}
