import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/usecases/createCategory";

const categoryRoutes = Router();
const categoryRepository = new CategoriesRepository();

categoryRoutes.post("/", (request, response) => {
   return createCategoryController.handle(request, response);
});

categoryRoutes.get("/", (request, response) => {
   const categories = categoryRepository.list();

   return response.status(200).json(categories);
});

export { categoryRoutes };
