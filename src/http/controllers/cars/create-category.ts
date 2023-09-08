import { Request, Response } from "express";
import { makeCreateCategoryService } from "../../../services/cars/factory/make-create-category-service";
import { CategoryAlreadyExistsError } from "../../../services/cars/errors/CategoryAlreadyExistsError";

export async function createCategory(request: Request, response: Response) {
   const { name, description } = request.body;

   try {
      const service = makeCreateCategoryService();
      await service.execute({ name, description });
   } catch (error) {
      if (error instanceof CategoryAlreadyExistsError) {
         return response.status(400).json({ message: error.message });
      }
   }

   return response.status(201).send();
}
