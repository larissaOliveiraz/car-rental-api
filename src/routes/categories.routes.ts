import { Router } from "express";
import { createCategoryController } from "../modules/cars/usecases/createCategory";
import { listCategoriesController } from "../modules/cars/usecases/listCategories";

const categoryRoutes = Router();

categoryRoutes.post("/", (request, response) => {
   return createCategoryController.handle(request, response);
});

categoryRoutes.get("/", (request, response) => {
   return listCategoriesController.handle(request, response);
});

export { categoryRoutes };
