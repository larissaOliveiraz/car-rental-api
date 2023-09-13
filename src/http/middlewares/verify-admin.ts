import { NextFunction, Request, Response } from "express";
import { makeGetUserProfileService } from "../../services/users/factory/make-get-user-profile-service";
import { AppError } from "../../errors/AppError";
import { UserNotAdminError } from "../../errors/UserNotAdminError";
import { UserNotFoundError } from "../../errors/UserNotFoundError";

export async function verifyAdmin(
   request: Request,
   response: Response,
   next: NextFunction
) {
   const { id } = request.user;

   try {
      const service = makeGetUserProfileService();
      const user = await service.execute({ id });

      if (!user.admin) {
         response.status(401).json({ message: "User is not admin." });
         throw new UserNotAdminError();
      }

      return next();
   } catch (error) {
      if (error instanceof UserNotFoundError) {
         return response.status(404).json({ message: error.message });
      }
   }
}
