import { Request, Response } from "express";
import { makeCreateCategoryService } from "../../../services/cars/factories/make-create-category-service";
import { CategoryAlreadyExistsError } from "../../../errors/cars/CategoryAlreadyExistsError";

export async function createCategory(request: Request, response: Response) {
   const { name, description } = request.body;

   try {
      const service = makeCreateCategoryService();
      await service.execute({ name, description });
   } catch (error) {
      if (error instanceof CategoryAlreadyExistsError) {
         return response.status(400).json({ message: error.message });
      }

      throw error;
   }

   return response.status(201).send();
}
