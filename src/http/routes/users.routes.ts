import { Router } from "express";
import { createUser } from "../controllers/user/create-user";
import { profile } from "../controllers/user/profile";

export const userRoutes = Router();

userRoutes.post("/", createUser);
userRoutes.get("/:id", profile);
