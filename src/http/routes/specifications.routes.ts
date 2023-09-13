import { Router } from "express";
import { createSpecification } from "../controllers/cars/create-specifications";
import { verifyAuthentication } from "../middlewares/verify-authentication";
import { verifyAdmin } from "../middlewares/verify-admin";

export const specificationRoutes = Router();

specificationRoutes.use(verifyAuthentication, verifyAdmin);
specificationRoutes.post("/", createSpecification);
