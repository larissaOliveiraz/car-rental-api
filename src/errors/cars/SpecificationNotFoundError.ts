import { AppError } from "../AppError";

export class SpecificationNotFoundError extends AppError {
   constructor(id?: string) {
      let message: string;
      if (id) {
         message = `Specification with id: '${id}' was not found`;
      } else {
         message = "Specification not found.";
      }
      super(message);
   }
}
