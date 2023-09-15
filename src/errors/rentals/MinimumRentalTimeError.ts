import { AppError } from "../AppError";

export class MinimumRentalTimeError extends AppError {
   constructor() {
      super("Minimum rental time is 24 hours.");
   }
}
