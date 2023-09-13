import { Router } from "express";
import { createCar } from "../controllers/cars/create-car";

export const carRoutes = Router();

carRoutes.post("/", createCar);
