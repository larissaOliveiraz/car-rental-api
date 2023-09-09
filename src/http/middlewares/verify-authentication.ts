import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { makeGetUserProfileService } from "@/services/users/factory/make-get-user-profile-service";
import { TokenMissingError } from "@/errors/TokenMissingError";
import { InvalidTokenError } from "@/errors/InvalidTokenError";

interface IPayload {
   sub: string;
}

export async function verifyAuthentication(
   request: Request,
   response: Response,
   next: NextFunction
) {
   const auth = request.headers.authorization;

   if (!auth) {
      response.status(401).json({ message: "Token missing." });
      throw new TokenMissingError();
   }

   const [_, token] = auth.split(" ");

   try {
      const { sub } = verify(
         token,
         "d04e45099b5a1ef42dda18aae6e5d96f"
      ) as IPayload;

      const service = makeGetUserProfileService();
      const user = await service.execute({ id: sub });

      if (!user) {
         throw new InvalidTokenError();
      }

      request.user = {
         id: sub,
      };

      next();
   } catch (error) {
      if (error instanceof InvalidTokenError) {
         return response.status(401).json({ message: error.message });
      }
   }
}
