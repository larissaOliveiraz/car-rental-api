import { Router } from "express";
import { createRental } from "../controllers/rentals/create-rental";
import { verifyAuthentication } from "../middlewares/verify-authentication";

export const rentalRoutes = Router();

rentalRoutes.use(verifyAuthentication);

rentalRoutes.post("/", createRental);
