import { AppError } from "./AppError";

export class UserNotAdminError extends AppError {
   constructor() {
      super("User is not admin.", 401);
   }
}
