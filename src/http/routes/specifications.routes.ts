import { Router } from "express";
import { createSpecification } from "../controllers/cars/create-specifications";
import { verifyAuthentication } from "../middlewares/verify-authentication";

export const specificationRoutes = Router();

specificationRoutes.use(verifyAuthentication);
specificationRoutes.post("/", createSpecification);
