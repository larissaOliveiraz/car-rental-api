import { SpecificationsRepository } from "../../../repositories/cars/implementation/SpecificationsRepository";
import { CreateSpecificationService } from "../CreateSpecificatioinService";

export function makeCreateSpecificationService() {
   const specificationsRepository = new SpecificationsRepository();
   const service = new CreateSpecificationService(specificationsRepository);

   return service;
}
