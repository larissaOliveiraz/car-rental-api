import { Router } from "express";
import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoryRoutes = Router();
const categoryRepository = new CategoriesRepository();

categoryRoutes.post("/", (request, response) => {
   const { name, description } = request.body;

   const categoryAlreadyExists = categoryRepository.findByName(name);

   if (categoryAlreadyExists) {
      return response.status(400).json({ message: "Category Already Exists." });
   }

   categoryRepository.create({ name, description });

   return response.status(201).send();
});

categoryRoutes.get("/", (request, response) => {
   const categories = categoryRepository.list();

   return response.status(200).json(categories);
});

export { categoryRoutes };
