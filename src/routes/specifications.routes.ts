import { Router } from "express";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificatioinService";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";

const specificationRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationRoutes.post("/", (request, response) => {
   const { name, description } = request.body;

   const createSpecificationsService = new CreateSpecificationService(
      specificationsRepository
   );
   createSpecificationsService.execute({ name, description });

   return response.status(201).send();
});

export { specificationRoutes };
