import { Router } from "express";
import { createSpecification } from "../controllers/cars/create-specifications";

export const specificationRoutes = Router();

specificationRoutes.post("/", createSpecification);
