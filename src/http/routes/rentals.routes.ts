import { Router } from "express";
import { createRental } from "../controllers/rentals/create-rental";
import { verifyAuthentication } from "../middlewares/verify-authentication";
import { returnRental } from "../controllers/rentals/return-rental";
import { listRentalsByUser } from "../controllers/rentals/list-rentals-by-user";

export const rentalRoutes = Router();

rentalRoutes.use(verifyAuthentication);

rentalRoutes.get("/", listRentalsByUser);
rentalRoutes.post("/", createRental);
rentalRoutes.put("/:id/return", returnRental);
