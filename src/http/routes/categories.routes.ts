import { Router } from "express";
import multer from "multer";
import { list } from "../controllers/cars/list";
import { create } from "../controllers/cars/create";
import { importCategories } from "../controllers/cars/import";

const categoryRoutes = Router();

const upload = multer({
   dest: "./tmp",
});

categoryRoutes.post("/", create);

categoryRoutes.get("/", list);

categoryRoutes.post("/import", upload.single("file"), importCategories);

export { categoryRoutes };
