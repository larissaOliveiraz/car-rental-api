import { AppError } from "./AppError";

export class CategoryAlreadyExistsError extends AppError {
   constructor() {
      super("Category already exists.");
   }
}
