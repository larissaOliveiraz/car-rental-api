import { Router } from "express";
import { createUser } from "../controllers/user/create-user";

export const userRoutes = Router();

userRoutes.post("/", createUser);
