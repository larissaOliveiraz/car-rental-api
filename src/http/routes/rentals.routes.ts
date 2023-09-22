import { Router } from "express";
import { createRental } from "../controllers/rentals/create-rental";
import { verifyAuthentication } from "../middlewares/verify-authentication";
import { returnRental } from "../controllers/rentals/return-rental";

export const rentalRoutes = Router();

rentalRoutes.use(verifyAuthentication);

rentalRoutes.post("/", createRental);
rentalRoutes.put("/:id/return", returnRental);
