import { Request, Response } from "express";
import { SpecificationAlreadyExistsError } from "../../../errors/cars/SpecificationAlreadyExistsError";
import { makeCreateSpecificationService } from "../../../services/cars/factories/make-create-specification-service";

export async function createSpecification(
   request: Request,
   response: Response
) {
   const { name, description } = request.body;

   try {
      const service = makeCreateSpecificationService();
      await service.execute({ name, description });
   } catch (error) {
      if (error instanceof SpecificationAlreadyExistsError) {
         return response.status(400).json({ message: error.message });
      }
   }

   return response.status(201).send();
}
