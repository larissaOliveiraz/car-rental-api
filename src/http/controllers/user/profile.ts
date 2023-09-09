import { Request, Response } from "express";
import { makeGetUserProfileService } from "@/services/users/factory/make-get-user-profile-service";
import { UserNotFoundError } from "@/errors/UserNotFoundError";

export async function profile(request: Request, response: Response) {
   const { id } = request.params;

   try {
      const service = makeGetUserProfileService();
      const { name, email } = await service.execute({ id });

      return response.status(200).json({ name, email });
   } catch (error) {
      if (error instanceof UserNotFoundError) {
         return response.status(400).json({ message: error.message });
      }
   }
}
