import { AppError } from "../AppError";

export class UserNotAvailableError extends AppError {
   constructor() {
      super("User cannot have more than one car rented at the same time.");
   }
}
