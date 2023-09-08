import { Router } from "express";
import multer from "multer";
import { listCategories } from "../controllers/cars/list-categories";
import { createCategory } from "../controllers/cars/create-category";
import { importCategories } from "../controllers/cars/import-categories";

export const categoryRoutes = Router();

const upload = multer({
   dest: "./tmp",
});

categoryRoutes.post("/", createCategory);

categoryRoutes.get("/", listCategories);

categoryRoutes.post("/import", upload.single("file"), importCategories);
