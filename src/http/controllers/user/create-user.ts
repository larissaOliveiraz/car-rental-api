import { Request, Response } from "express";
import { makeCreateUserService } from "../../../services/users/factory/make-create-user-service";

export async function createUser(request: Request, response: Response) {
   const { name, username, email, password, driver_licence } = request.body;

   try {
      const service = makeCreateUserService();
      await service.execute({
         name,
         username,
         email,
         password,
         driver_licence,
      });
   } catch (error) {}

   return response.status(201).send();
}
