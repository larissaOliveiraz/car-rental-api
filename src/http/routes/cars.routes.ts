import multer from "multer";
import uploadConfig from "../../config/upload";
import { Router } from "express";
import { createCar } from "../controllers/cars/create-car";
import { verifyAuthentication } from "../middlewares/verify-authentication";
import { verifyAdmin } from "../middlewares/verify-admin";
import { listCars } from "../controllers/cars/list-cars";
import { createCarSpecification } from "../controllers/cars/create-car-specification";
import { uploadCarImages } from "../controllers/cars/upload-car-images";

export const carRoutes = Router();

const uploadImages = multer(uploadConfig.upload("./tmp/cars"));

carRoutes.get("/", listCars);

carRoutes.use(verifyAuthentication, verifyAdmin);

carRoutes.post("/", createCar);
carRoutes.post("/:id/specifications", createCarSpecification);
carRoutes.post(
   "/:id/images",
   uploadImages.array("imageFiles"),
   uploadCarImages
);
