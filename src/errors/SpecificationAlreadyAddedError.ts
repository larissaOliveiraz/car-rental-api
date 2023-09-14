import { AppError } from "./AppError";

export class SpecificationAlreadyAddedToCarError extends AppError {
   constructor(specId: string) {
      super(
         `Specification with id: '${specId}' was already added to this car'`
      );
   }
}
