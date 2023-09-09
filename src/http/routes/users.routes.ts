import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../config/upload";
import { createUser } from "../controllers/user/create-user";
import { profile } from "../controllers/user/profile";
import { updateAvatar } from "../controllers/user/update-avatar";
import { verifyAuthentication } from "../middlewares/verify-authentication";

export const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

userRoutes.post("/", createUser);
userRoutes.get("/:id", profile);
userRoutes.patch(
   "/avatar",
   verifyAuthentication,
   uploadAvatar.single("avatar"),
   updateAvatar
);
