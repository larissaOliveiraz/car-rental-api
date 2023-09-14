import { Request, Response } from "express";
import { CarNotFoundError } from "../../../errors/CarNotFoundError";
import { makeCreateCarSpecificationService } from "../../../services/cars/factory/make-create-car-specification-service";
import { SpecificationNotFoundError } from "../../../errors/SpecificationNotFoundError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SpecificationAlreadyAddedToCarError } from "../../../errors/SpecificationAlreadyAddedError";

export async function createCarSpecification(
   request: Request,
   response: Response
) {
   const { id } = request.params;
   const { specificationsId } = request.body;

   try {
      const service = makeCreateCarSpecificationService();
      await service.execute({ carId: id, specificationsId });
      return response.status(201).send();
   } catch (error) {
      if (error instanceof CarNotFoundError) {
         return response.status(404).json({ message: error.message });
      }
      if (error instanceof SpecificationNotFoundError) {
         return response.status(404).json({ message: error.message });
      }
      if (error instanceof SpecificationAlreadyAddedToCarError) {
         return response.status(400).json({ message: error.message });
      }

      throw error;
   }
}
