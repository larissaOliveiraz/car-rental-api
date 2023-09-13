import { Request, Response } from "express";
import { InvalidCredentialsError } from "../../../errors/InvalidCredentialsError";
import { makeAuthenticateUserService } from "../../../services/users/factory/make-authenticate-user-service";

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
