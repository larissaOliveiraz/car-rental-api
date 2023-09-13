import { Request, Response } from "express";
import { UserAlreadyExistsError } from "../../../errors/UserAlreadyExistsError";
import { makeCreateUserService } from "../../../services/users/factory/make-create-user-service";

export async function createUser(request: Request, response: Response) {
   const { name, email, password, driver_license } = request.body;

   try {
      const service = makeCreateUserService();
      await service.execute({
         name,
         email,
         password,
         driver_license,
      });
   } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
         return response.status(400).json({ message: error.message });
      }

      throw error;
   }

   return response.status(201).send();
}
