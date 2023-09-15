import { AppError } from "../AppError";

export class CarNotAvailableError extends AppError {
   constructor() {
      super("Car not available for rent.");
   }
}
