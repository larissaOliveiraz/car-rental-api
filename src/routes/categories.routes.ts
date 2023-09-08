import { Router } from "express";
import multer from "multer";
import { list } from "../http/controllers/cars/list";
import { create } from "../http/controllers/cars/create";

const categoryRoutes = Router();

const upload = multer({
   dest: "./tmp",
});

categoryRoutes.post("/", create);

categoryRoutes.get("/", list);

// categoryRoutes.post("/import", upload.single("file"), (request, response) => {
//    return importCategoriesController.handle(request, response);
// });

export { categoryRoutes };
