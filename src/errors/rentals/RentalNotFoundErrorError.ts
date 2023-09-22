import { AppError } from "../AppError";

export class RentalNotFoundError extends AppError {
   constructor() {
      super("Rental not found.");
   }
}
