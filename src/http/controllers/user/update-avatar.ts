import { Request, Response } from "express";
import { makeUpdateUserAvatarService } from "../../../services/users/factory/make-update-user-avatar-service";

export async function updateAvatar(request: Request, response: Response) {
   const { id } = request.user;
   const avatarFile = request.file.filename;

   const service = makeUpdateUserAvatarService();
   await service.execute({ userId: id, avatarFile });

   return response.status(204).send();
}
