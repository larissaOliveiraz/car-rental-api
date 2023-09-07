import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { CreateSpecificationUseCase } from "./CreateSpecificatioinUseCase";
import { CreateSpecificationController } from "./CreateSpecificationController";

const specificationsRepository = SpecificationsRepository.getInstance();

const createSpecificationUseCase = new CreateSpecificationUseCase(
   specificationsRepository
);

const createSpecificationController = new CreateSpecificationController(
   createSpecificationUseCase
);

export { createSpecificationController };
