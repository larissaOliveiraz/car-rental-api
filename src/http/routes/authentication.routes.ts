import { Router } from "express";
import { authenticateUser } from "../controllers/user/authenticate-user";

export const authenticationRoutes = Router();

authenticationRoutes.post("/sessions", authenticateUser);
