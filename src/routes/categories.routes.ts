import { Router } from "express";
import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoryRoutes = Router();
const categoryRepository = new CategoriesRepository();

categoryRoutes.post("/", (request, response) => {
   const { name, description } = request.body;

   categoryRepository.create({ name, description });

   return response.status(201).send();
});

export { categoryRoutes };
