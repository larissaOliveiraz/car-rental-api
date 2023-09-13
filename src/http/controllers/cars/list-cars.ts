import { Request, Response } from "express";
import { makeListCarsService } from "../../../services/cars/factory/make-list-cars-service";

export async function listCars(request: Request, response: Response) {
   const { category, name, brand } = request.query;

   try {
      const service = makeListCarsService();
      const cars = await service.execute({
         categoryId: category as string,
         name: name as string,
         brand: brand as string,
      });
      return response.status(200).json(cars);
   } catch (error) {
      throw error;
   }
}
