import { AppError } from "./AppError";

export class TokenMissingError extends AppError {
   constructor() {
      super("Token missing.", 401);
   }
}
