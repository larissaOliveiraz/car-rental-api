import { SpecificationsRepository } from "../../../infra/prisma/repositories/cars/SpecificationsRepository";
import { CreateSpecificationService } from "../CreateSpecificatioinService";

export function makeCreateSpecificationService() {
   const specificationsRepository = new SpecificationsRepository();
   const service = new CreateSpecificationService(specificationsRepository);

   return service;
}
