import { Request, Response } from "express";
import { CarAlreadyExistsError } from "../../../errors/CarAlreadyExistsError";
import { makeCreateCarService } from "../../../services/cars/factory/make-create-car-service";

export async function createCar(request: Request, response: Response) {
   const {
      name,
      category_id,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
   } = request.body;

   try {
      const service = makeCreateCarService();
      await service.execute({
         name,
         category_id,
         description,
         brand,
         daily_rate,
         fine_amount,
         license_plate,
      });
      return response.status(201).send();
   } catch (error) {
      if (error instanceof CarAlreadyExistsError) {
         return response.status(400).json({ message: error.message });
      }

      throw error;
   }
}
