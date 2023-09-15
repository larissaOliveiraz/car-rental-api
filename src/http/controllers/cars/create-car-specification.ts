import { Request, Response } from "express";
import { CarNotFoundError } from "../../../errors/cars/CarNotFoundError";
import { makeCreateCarSpecificationService } from "../../../services/cars/factories/make-create-car-specification-service";
import { SpecificationNotFoundError } from "../../../errors/cars/SpecificationNotFoundError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SpecificationAlreadyAddedToCarError } from "../../../errors/cars/SpecificationAlreadyAddedToCarError";

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
         return response
            .status(400)
            .json({ message: error.message, specificationId: error.item });
      }

      throw error;
   }
}
