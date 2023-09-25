import { Router } from "express";
import { authenticateUser } from "../controllers/user/authenticate-user";
import { refreshToken } from "../controllers/user/refresh-token";

export const authenticationRoutes = Router();

authenticationRoutes.post("/sessions", authenticateUser);
authenticationRoutes.post("/refresh-token", refreshToken);
