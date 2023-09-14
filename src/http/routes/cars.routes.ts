import { Router } from "express";
import { createCar } from "../controllers/cars/create-car";
import { verifyAuthentication } from "../middlewares/verify-authentication";
import { verifyAdmin } from "../middlewares/verify-admin";
import { listCars } from "../controllers/cars/list-cars";
import { createCarSpecification } from "../controllers/cars/create-car-specification";

export const carRoutes = Router();

carRoutes.get("/", listCars);

carRoutes.use(verifyAuthentication, verifyAdmin);

carRoutes.post("/", createCar);
carRoutes.post("/specifications", createCarSpecification);
