import { Request, Response } from "express";
import { makeListCategoriesService } from "../../../services/cars/factory/make-list-categories-service";

export async function listCategories(request: Request, response: Response) {
   const service = makeListCategoriesService();
   const categories = await service.execute();

   return response.status(200).json(categories);
}
