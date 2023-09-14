import { AppError } from "./AppError";

export class CarNotFoundError extends AppError {
   constructor() {
      super("Car not found.");
   }
}
