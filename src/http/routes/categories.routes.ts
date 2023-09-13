import { Router } from "express";
import multer from "multer";
import { listCategories } from "../controllers/cars/list-categories";
import { createCategory } from "../controllers/cars/create-category";
import { importCategories } from "../controllers/cars/import-categories";
import { verifyAuthentication } from "../middlewares/verify-authentication";
import { verifyAdmin } from "../middlewares/verify-admin";

export const categoryRoutes = Router();

const upload = multer({
   dest: "./tmp",
});

categoryRoutes.get("/", listCategories);

categoryRoutes.use(verifyAuthentication, verifyAdmin);

categoryRoutes.post("/", createCategory);
categoryRoutes.post("/import", upload.single("file"), importCategories);
