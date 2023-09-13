import { Router } from "express";
import { createCar } from "../controllers/cars/create-car";
import { verifyAuthentication } from "../middlewares/verify-authentication";
import { verifyAdmin } from "../middlewares/verify-admin";

export const carRoutes = Router();

carRoutes.use(verifyAuthentication, verifyAdmin);

carRoutes.post("/", createCar);
