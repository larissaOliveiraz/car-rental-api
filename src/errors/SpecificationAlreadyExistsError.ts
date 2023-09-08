import { AppError } from "./AppError";

export class SpecificationAlreadyExistsError extends AppError {
   constructor() {
      super("Specification already exists.");
   }
}
