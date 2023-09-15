import { AppError } from "../AppError";

export class CarAlreadyExistsError extends AppError {
   constructor() {
      super("Car with this license plate already exists.");
   }
}
