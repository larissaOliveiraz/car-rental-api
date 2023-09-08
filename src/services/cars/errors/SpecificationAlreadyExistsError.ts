export class SpecificationAlreadyExistsError extends Error {
   constructor() {
      super("Specification already exists.");
   }
}
