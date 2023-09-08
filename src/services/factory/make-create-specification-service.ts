import { SpecificationsRepository } from "../../repositories/implementation/SpecificationsRepository";
import { CreateSpecificationService } from "../cars/CreateSpecificatioinService";

export function makeCreateSpecificationService() {
   const specificationsRepository = new SpecificationsRepository();
   const service = new CreateSpecificationService(specificationsRepository);

   return service;
}
