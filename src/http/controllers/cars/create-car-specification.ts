import { Request, Response } from "express";
import { CarNotFoundError } from "../../../errors/CarNotFoundError";
import { makeCreateCarSpecificationService } from "../../../services/cars/factory/make-create-car-specification-service";
import { SpecificationNotFoundError } from "../../../errors/SpecificationNotFoundError";

export async function createCarSpecification(
   request: Request,
   response: Response
) {
   const { carId, specificationsId } = request.body;

   try {
      const service = makeCreateCarSpecificationService();
      await service.execute({ carId, specificationsId });
      return response.status(201).send();
   } catch (error) {
      if (error instanceof CarNotFoundError) {
         return response.status(404).json({ message: error.message });
      }
      if (error instanceof SpecificationNotFoundError) {
         return response.status(404).json({ message: error.message });
      }

      throw error;
   }
}
