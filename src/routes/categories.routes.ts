import { Router } from "express";
import { Category } from "../modules/cars/model/Category";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoryRoutes = Router();
const categoryRepository = new CategoriesRepository();

categoryRoutes.post("/", (request, response) => {
   const { name, description } = request.body;

   const createCateogryService = new CreateCategoryService(categoryRepository);
   createCateogryService.execute({ name, description });

   return response.status(201).send();
});

categoryRoutes.get("/", (request, response) => {
   const categories = categoryRepository.list();

   return response.status(200).json(categories);
});

export { categoryRoutes };
