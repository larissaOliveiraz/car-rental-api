import { Router } from "express";
import multer from "multer";
import { createCategoryController } from "../modules/cars/usecases/create-category";
import { listCategoriesController } from "../modules/cars/usecases/list-categories";
import { importCategoriesController } from "../modules/cars/usecases/import-categories";

const categoryRoutes = Router();

const upload = multer({
   dest: "./tmp",
});

categoryRoutes.post("/", (request, response) => {
   return createCategoryController.handle(request, response);
});

categoryRoutes.get("/", (request, response) => {
   return listCategoriesController.handle(request, response);
});

categoryRoutes.post("/import", upload.single("file"), (request, response) => {
   return importCategoriesController.handle(request, response);
});

export { categoryRoutes };
