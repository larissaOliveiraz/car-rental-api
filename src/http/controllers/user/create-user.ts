import { Request, Response } from "express";
import { makeCreateUserService } from "../../../services/users/factory/make-create-user-service";
import { UserAlreadyExistsError } from "../../../services/users/errors/UserAlreadyExistsError";

export async function createUser(request: Request, response: Response) {
   const { name, email, password, driver_licence } = request.body;

   try {
      const service = makeCreateUserService();
      await service.execute({
         name,
         email,
         password,
         driver_licence,
      });
   } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
         return response.status(400).json({ message: error.message });
      }
   }

   return response.status(201).send();
}