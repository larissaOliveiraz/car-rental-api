import { Request, Response } from "express";
import { makeAuthenticateUserService } from "../../../services/users/factory/make-authenticate-user-service";
import { UserNotFoundError } from "../../../errors/UserNotFoundError";
import { InvalidCredentialsError } from "../../../errors/InvalidCredentialsError";

export async function authenticateUser(request: Request, response: Response) {
   const { email, password } = request.body;

   try {
      const service = makeAuthenticateUserService();
      const { token } = await service.execute({ email, password });

      return response.status(201).json({ token });
   } catch (error) {
      if (error instanceof InvalidCredentialsError) {
         return response.status(400).json({ message: error.message });
      }
   }
}
