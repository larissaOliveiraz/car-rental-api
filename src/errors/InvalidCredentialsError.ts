import { AppError } from "./AppError";

export class InvalidCredentialsError extends AppError {
   constructor() {
      super("Invalid Credentials.", 400);
   }
}
